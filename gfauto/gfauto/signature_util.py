# -*- coding: utf-8 -*-

# Copyright 2019 The GraphicsFuzz Project Authors
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import re
from pathlib import Path
from typing import Optional, Iterator, Match, Pattern

from gfauto import util, subprocess_util

# E.g. /my/library.so ((anonymous namespace)::Bar::Baz(aaa::MyInstr*, void* (*)(unsigned int))+456)
#                                                ::Baz(  <-- regex
#                                                  Baz   <-- group 1
PATTERN_CPP_FUNCTION = re.compile(r"::(\w+)\(")

# E.g. /my/library.so (myFunction+372)
#                     (myFunction+372)  <-- regex
#                      myFunction       <-- group 1
# OR: /my/library.so (myFunction(...)+372)
#                    (myFunction(
#                     myFunction
PATTERN_C_FUNCTION = re.compile(r"\((\w+)(\+\d+\)|\()")


# E.g. ERROR: temp/.../variant/shader.frag:549: 'variable indexing fragment shader output array' : not supported with this profile: es
#                                     frag:123: 'variable indexing fragment shader output array'  <-- regex
#                                                variable indexing fragment shader output array   <-- group 1
PATTERN_GLSLANG_ERROR = re.compile(r"\w+:\d+: '([^'\n]+)'")


# E.g. /data/local/tmp/graphicsfuzz/test.amber: 256: probe ssbo format does not match buffer format
#                                             : 256: probe ssbo format does not match buffer format
#                                                    probe ssbo format does not match buffer format
PATTERN_AMBER_ERROR = re.compile(r"\w: \d+: ([\w ]+)$")

# E.g. error: line 0: Module contains unreachable blocks during merge return.  Run dead branch elimination before merge return.
#      error: line 0: Module contains unreachable blocks during merge return.  Run dead branch elimination before merge return.
#                     Module contains unreachable blocks during merge return.  Run dead branch elimination before merge return.
PATTERN_SPIRV_OPT_ERROR: Pattern[str] = re.compile(r"^error: line \d+: ([^\n]+)")

# E.g.
# Backtrace:
# /data/git/graphicsfuzz/graphicsfuzz/target/graphicsfuzz/bin/Linux/spirv-opt(_ZN8spvtools3opt21StructuredCFGAnalysis16SwitchMergeBlockEj+0x369)[0x5bd6d9]
PATTERN_CATCHSEGV_STACK_FRAME = re.compile(r"Backtrace:\n.*/([^/(]*\([^)+]+)\+")

# E.g.
# Backtrace:
# /data/git/graphicsfuzz/gfauto/temp/june20/binaries/swiftshader_vulkan/Linux/libvk_swiftshader.so(+0x1d537d)[0x7f51ebd1237d]
# /data/git/graphicsfuzz/gfauto/temp/june20/binaries/swiftshader_vulkan/Linux/libvk_swiftshader.so  0x1d537d
# ^ group 1                                                                                          ^ group 2
PATTERN_CATCHSEGV_STACK_FRAME_ADDRESS = re.compile(
    r"Backtrace:\n(.*)\(\+([x\da-fA-F]+)+\)\["
)

# E.g.
# glslangValidator: ../glslang/MachineIndependent/ParseHelper.cpp:2212: void glslang::TParseContext::nonOpBuiltInCheck(const glslang::TSourceLoc&, const glslang::TFunction&, glslang::TIntermAggregate&): Assertion `PureOperatorBuiltins == false' failed.

PATTERN_GLSLANG_FAILURE = re.compile(r"glslangValidator:.*?: (.*)")


def get_signature_from_log_contents(log_contents: str) -> str:

    if "Shader compilation failed" in log_contents:
        return "compile_error"

    if "Failed to link shaders" in log_contents:
        return "link_error"

    if "Calling vkCreateGraphicsPipelines Fail" in log_contents:
        return "pipeline_failure"

    # TODO: Check for Amber fence failure.

    if "Resource deadlock would occur" in log_contents:
        return "Resource_deadlock_would_occur"

    if "error: line " in log_contents:
        lines = log_contents.split("\n")
        for line in lines:
            spirv_opt_error_matches = re.finditer(
                PATTERN_SPIRV_OPT_ERROR, line
            )  # type: Iterator[Match[str]]
            spirv_opt_error_match = next(
                spirv_opt_error_matches, None
            )  # type: Optional[Match[str]]
            if spirv_opt_error_match:
                group = spirv_opt_error_match.group(1)
                # Remove numbers.
                group = re.sub(r"\d+", "", group)
                # Replace non-word characters with _.
                group = re.sub(r"[^\w]", "_", group)
                # Reduce length.
                group = group[:20]
                return group

    if "0 pass, 1 fail" in log_contents:
        lines = log_contents.split("\n")
        for line in lines:
            amber_error_matches = re.finditer(
                PATTERN_AMBER_ERROR, line
            )  # type: Iterator[Match[str]]
            amber_error_match = next(
                amber_error_matches, None
            )  # type: Optional[Match[str]]
            if amber_error_match:
                group = amber_error_match.group(1)
                # Remove numbers.
                group = re.sub(r"\d+", "", group)
                # Replace non-word characters with _.
                group = re.sub(r"[^\w]", "_", group)
                return group

    if "SPIR-V is not generated for failed compile or link" in log_contents:
        lines = log_contents.split("\n")
        for line in lines:
            glslang_error_matches = re.finditer(
                PATTERN_GLSLANG_ERROR, line
            )  # type: Iterator[Match[str]]
            glslang_error_match = next(
                glslang_error_matches, None
            )  # type: Optional[Match[str]]
            if glslang_error_match:
                group = glslang_error_match.group(1)
                # Remove numbers.
                group = re.sub(r"\d+", "", group)
                # Replace non-word characters with _.
                group = re.sub(r"[^\w]", "_", group)
                # Reduce length.
                group = group[:20]
                return group

    if "#00 pc" in log_contents:
        lines = log_contents.split("\n")
        for line in lines:
            pc_pos = line.find("#00 pc")
            if pc_pos == -1:
                continue
            line = line[pc_pos:]

            if "/amber_ndk" in line:
                return "amber_ndk"

            cpp_function_matches = re.finditer(
                PATTERN_CPP_FUNCTION, line
            )  # type: Iterator[Match[str]]
            cpp_function_match = next(
                cpp_function_matches, None
            )  # type: Optional[Match[str]]
            if cpp_function_match:
                return cpp_function_match.group(1)

            c_function_matches = re.finditer(
                PATTERN_C_FUNCTION, line
            )  # type: Iterator[Match[str]]
            c_function_match = next(
                c_function_matches, None
            )  # type: Optional[Match[str]]
            if c_function_match:
                return c_function_match.group(1)

            # TODO: More.

            break

    # catchsegv "Backtrace:" with source code info.
    if "Backtrace:" in log_contents:
        catchsegv_matches = re.finditer(
            PATTERN_CATCHSEGV_STACK_FRAME, log_contents
        )  # type: Iterator[Match[str]]
        catchsegv_match = next(catchsegv_matches, None)  # type: Optional[Match[str]]
        if catchsegv_match:
            group = catchsegv_match.group(1)
            # Replace non-word characters with _.
            group = re.sub(r"[^\w]", "_", group)
            # Reduce length.
            group = group[:50]
            return group

    if "Backtrace:" in log_contents:
        result = get_signature_from_catchsegv_frame_address(log_contents)
        if result:
            return result

    if "glslangValidator:" in log_contents:
        lines = log_contents.split("\n")
        for line in lines:
            glslang_failure_matches = re.finditer(
                PATTERN_GLSLANG_FAILURE, line
            )  # type: Iterator[Match[str]]
            glslang_failure_match = next(
                glslang_failure_matches, None
            )  # type: Optional[Match[str]]
            if glslang_failure_match:
                group = glslang_failure_match.group(1)
                # Remove numbers.
                group = re.sub(r"\d+", "", group)
                # Replace non-word characters with _.
                group = re.sub(r"[^\w]", "_", group)
                # Reduce length.
                group = group[:20]
                return group

    return "no_signature"


def get_signature_from_catchsegv_frame_address(log_contents: str) -> Optional[str]:
    catchsegv_address_matches = re.finditer(
        PATTERN_CATCHSEGV_STACK_FRAME_ADDRESS, log_contents
    )  # type: Iterator[Match[str]]
    catchsegv_address_match = next(
        catchsegv_address_matches, None
    )  # type: Optional[Match[str]]
    if not catchsegv_address_match:
        return None
    module = Path(catchsegv_address_match.group(1))
    if not module.exists():
        return None
    address = catchsegv_address_match.group(2)
    function_signature = get_function_signature_from_address(module, address)
    if not function_signature:
        return None
    # Replace non-word characters with _.
    function_signature = re.sub(r"[^\w]", "_", function_signature)
    # Reduce length.
    function_signature = function_signature[:50]
    return function_signature


def get_function_signature_from_address(module: Path, address: str) -> Optional[str]:
    try:
        address_tool = util.tool_on_path("addr2line")
        result = subprocess_util.run(
            [str(address_tool), "-e", str(module), address, "-f", "-C"],
            check_exit_code=False,
        )
        if result.returncode != 0:
            return None
        stdout = result.stdout  # type: str
        lines = stdout.splitlines()
        if not lines:
            return None
        return lines[0]
    except util.ToolNotOnPathError:
        return None
