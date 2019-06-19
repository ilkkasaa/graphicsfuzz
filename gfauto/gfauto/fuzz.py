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

import random
import re
import sys
import uuid
from pathlib import Path
from subprocess import SubprocessError
from typing import Iterator, Match, Optional

from gfauto.subprocess_util import run
from gfauto.util import test_metadata_get_path, test_get_source_dir
from .android_device import run_amber_on_device
from .artifacts import *  # pylint: disable=wildcard-import
from .gflogging import log_a_file
from .recipe_glsl_reference_shader_job_to_glsl_variant_shader_job import run_generate
from .recipe_spirv_asm_shader_job_to_amber_script import AmberfySettings
from .recipe_spirv_shader_job_to_spirv_shader_job_opt import random_spirv_opt_args
from .shader_job_util import EXT_COMP, shader_job_copy, shader_job_get_related_files
from .test_pb2 import Test, TestGlsl
from .tool import BinaryPaths, glsl_shader_job_to_amber_script
from .util import (
    copy_dir,
    file_open_text,
    file_read_text,
    file_read_text_or_else,
    file_write_text,
    mkdirs_p,
    move_dir,
    test_metadata_read,
    test_metadata_write,
)

# TODO: Consider using "import gfauto.util" to avoid circular import issues.


def get_random_name() -> str:
    # TODO: could change to human-readable random name or the date.
    return uuid.uuid4().hex


REFERENCE_DIR = "reference"
VARIANT_DIR = "variant"
SHADER_JOB = "shader.json"
SHADER_JOB_RESULT = "shader.info.json"


def make_subtest(
    base_source_dir: Path, subtest_dir: Path, spirv_opt_args: Optional[List[str]]
) -> Path:
    # Create the subtest by copying the base source.
    copy_dir(base_source_dir, test_get_source_dir(subtest_dir))

    # Write the test metadata.
    test_metadata_write(
        Test(
            glsl=TestGlsl(
                glslang_version_hash="",
                spirv_opt_version_hash="",
                spirv_opt_args=spirv_opt_args,
            )
        ),
        subtest_dir,
    )

    return subtest_dir


def main() -> None:
    # TODO: Use sys.argv[1:].

    reports_dir = Path() / "reports"
    temp_dir = Path() / "temp"
    donors_dir = Path() / "donors"
    references = sorted(donors_dir.rglob("*.json"))

    # TODO: make GraphicsFuzz find donors recursively.

    # Filter to only include .json files that have at least one shader (.frag, .vert, .comp) file.
    references = [ref for ref in references if shader_job_get_related_files(ref)]

    while True:
        test_name = get_random_name()
        test_dir = temp_dir / test_name

        base_source_dir = test_dir / "base_source"

        # Copy in a randomly chosen reference.
        reference_glsl_shader_job = shader_job_copy(
            random.choice(references), base_source_dir / REFERENCE_DIR / SHADER_JOB
        )

        # Pick a seed.
        seed = random.randint(-pow(2, 31), pow(2, 31) - 1)

        run_generate(
            reference_glsl_shader_job,
            donors_dir,
            mkdirs_p(base_source_dir / VARIANT_DIR) / SHADER_JOB,
            str(seed),
        )

        test_dirs = [
            make_subtest(
                base_source_dir,
                test_dir / f"{test_name}_no_opt_test",
                spirv_opt_args=None,
            ),
            make_subtest(
                base_source_dir,
                test_dir / f"{test_name}_opt_O_test",
                spirv_opt_args=["-O"],
            ),
            make_subtest(
                base_source_dir,
                test_dir / f"{test_name}_opt_Os_test",
                spirv_opt_args=["-Os"],
            ),
            make_subtest(
                base_source_dir,
                test_dir / f"{test_name}_opt_rand1_test",
                spirv_opt_args=random_spirv_opt_args(),
            ),
            make_subtest(
                base_source_dir,
                test_dir / f"{test_name}_opt_rand2_test",
                spirv_opt_args=random_spirv_opt_args(),
            ),
            make_subtest(
                base_source_dir,
                test_dir / f"{test_name}_opt_rand3_test",
                spirv_opt_args=random_spirv_opt_args(),
            ),
        ]

        for test_dir in test_dirs:
            if handle_test(test_dir, reports_dir):
                # If we generated a report, don't bother trying other optimization combinations.
                break


def handle_test(test_dir: Path, reports_dir: Path) -> Optional[Path]:
    test = test_metadata_read(test_dir)
    if test.HasField("glsl"):
        return handle_glsl_test(test.glsl, test_dir, reports_dir)
    else:
        raise AssertionError("Unrecognized test type")


PATTERN_HEX_LIKE = re.compile("(0([xX]))?[A-Fa-f0-9]{4}[A-Fa-f0-9]*")

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
PATTERN_GLSLANG_ERROR = re.compile(r"\w+:\d+: '([\w ]+)'")


# E.g. /data/local/tmp/graphicsfuzz/test.amber: 256: probe ssbo format does not match buffer format
#                                             : 256: probe ssbo format does not match buffer format
#                                                    probe ssbo format does not match buffer format
PATTERN_AMBER_ERROR = re.compile(r"\w: \d+: ([\w ]+)$")

# E.g. error: line 0: Module contains unreachable blocks during merge return.  Run dead branch elimination before merge return.
#      error: line 0: Module contains unreachable blocks during merge return.  Run dead branch elimination before merge return.
#                     Module contains unreachable blocks during merge return.  Run dead branch elimination before merge return.
PATTERN_SPIRV_OPT_ERROR = re.compile(r"^error: line \d+: ([\w .'\-\"]+)")

# E.g.
# Backtrace:
# /data/git/graphicsfuzz/graphicsfuzz/target/graphicsfuzz/bin/Linux/spirv-opt(_ZN8spvtools3opt21StructuredCFGAnalysis16SwitchMergeBlockEj+0x369)[0x5bd6d9]
PATTERN_CATCHSEGV_STACK_FRAME = re.compile(r"Backtrace:\n.*/([^/(]*\([^)+]+)\+")


def get_signature_from_log_contents(log_contents: str) -> str:

    if log_contents.find("Shader compilation failed") != -1:
        return "compile_error"

    if log_contents.find("Failed to link shaders") != -1:
        return "link_error"

    if log_contents.find("Calling vkCreateGraphicsPipelines Fail") != -1:
        return "pipeline_failure"

    # TODO: Check for Amber fence failure.

    if log_contents.find("Resource deadlock would occur") != -1:
        return "Resource_deadlock_would_occur"

    if log_contents.find("error: line ") != -1:
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

    if log_contents.find("0 pass, 1 fail") != -1:
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

    if log_contents.find("SPIR-V is not generated for failed compile or link") != -1:
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
                return group

    if log_contents.find("#00 pc") != -1:
        lines = log_contents.split("\n")
        for line in lines:
            pc_pos = line.find("#00 pc")
            if pc_pos == -1:
                continue
            line = line[pc_pos:]

            if line.find("/amber_ndk") != -1:
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

    if log_contents.find("Backtrace:") != -1:
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

    return "no_signature"


def move_test_to_crash_report_using_log_signature(
    log_path: Path, test_dir: Path, reports_dir: Path, crash_subdirectory_name: str
) -> Path:
    log_contents = file_read_text(log_path)
    signature = get_signature_from_log_contents(log_contents)
    output_test_dir = move_dir(
        test_dir, reports_dir / crash_subdirectory_name / signature / test_dir.name
    )
    test = test_metadata_read(output_test_dir)
    test.crash_signature = signature
    test_metadata_write(test, output_test_dir)
    return output_test_dir


# GLSL test_dir:
# - 1234/ (not a proper test_dir, as it only has "base_source", not "source".
#   - base_source/
#     - test.json
#     - reference/ variant/
#       - shader.json shader.{comp,frag}
#   - 123_no_opt/ 123_opt_O/ 123_opt_Os/ 123_opt_rand1/ etc. (proper test_dirs, as they have "source")
#     - source/ (same as base source, but with different metadata, including a crash signature, once identified)
#     - results/
#       - pixel/ other_phone/ laptop/ etc.
#         - reference/ variant/
#           - test.amber
#           - image.png
#           - STATUS
#           - log.txt
#           - (all other result files and files for running the shader on the device)
#         - reductions/
#           - reduction_1/ reduction_blah/ etc. (reduction name; also a test_dir)
#             - source/ (same as other source dirs, but with the final reduced shader source)
#             - work/
#               - reference/ variant/
#                 - shader.json, shader_reduction_001_success.json,
#                 shader_reduction_002_failed.json, etc., shader_reduced_final.json
#                 - shader/ shader_reduction_001/
#                 (these are the result directories for each step, containing STATUS, etc.)
#


def test_get_shader_job_path(test_dir: Path, is_variant: bool = True) -> Path:
    return (
        test_dir / "test" / (VARIANT_DIR if is_variant else REFERENCE_DIR) / SHADER_JOB
    )


def test_get_device_directory(test_dir: Path, device_name: str) -> Path:
    return test_dir / "results" / device_name


def test_get_results_directory(
    test_dir: Path, device_name: str, is_variant: bool = True
) -> Path:
    return test_get_results_directory(test_dir, device_name) / (
        VARIANT_DIR if is_variant else REFERENCE_DIR
    )


def test_get_reduced_test_dir(
    test_dir: Path, device_name: str, reduction_name: str
) -> Path:
    return (
        test_get_device_directory(test_dir, device_name) / "reductions" / reduction_name
    )


def test_get_reduction_directory(
    test_dir: Path, device_name: str, reduction_name: str, is_variant: bool = True
) -> Path:
    return (
        test_get_reduced_test_dir(test_dir, device_name, reduction_name)
        / "work"
        / (VARIANT_DIR if is_variant else REFERENCE_DIR)
    )


def run_glsl_reduce(
    input_shader_job: Path,
    test_metadata_path: Path,
    output_dir: Path,
    preserve_semantics: bool = False,
) -> Path:

    cmd = [
        "glsl-reduce",
        str(input_shader_job),
        "gfauto_interestingness_test",
        str(test_metadata_path),
        "--output",
        str(output_dir),
    ]

    if preserve_semantics:
        cmd.append("--preserve-semantics")

    run(cmd)

    return output_dir


def run_reduction(
    test_dir: Path, device_name: str, reduction_name: str = "reduction1"
) -> None:
    test = test_metadata_read(test_dir)
    if not test.crash_signature:
        raise AssertionError(
            f"Cannot reduce {str(test_dir)} because there is no crash string specified; "
            f"for now, only crash reductions are supported"
        )

    reduction_directory = run_glsl_reduce(
        input_shader_job=test_get_shader_job_path(test_dir, is_variant=True),
        test_metadata_path=test_metadata_get_path(test_dir),
        output_dir=test_get_reduction_directory(
            test_dir, device_name, reduction_name, is_variant=True
        ),
        preserve_semantics=True,
    )

    # Create an intermediate test directory containing the final reduced shader.

    reduced_test_dir_1 = copy_dir(test_dir, test_get_reduced_test_directory(test_dir))


def handle_glsl_test(
    test: TestGlsl, test_dir: Path, reports_dir: Path
) -> Optional[Path]:
    # Maybe try just on spirv-opt first.

    # Run it on several devices, etc.

    # For now, just run the variant on the one device and see if it crashes.

    device_name = "android_device"

    result_output_dir = test_get_results_directory(
        test_dir, device_name, is_variant=True
    )
    run_shader_job(
        test_get_shader_job_path(test_dir, is_variant=True), result_output_dir, test
    )

    status_file = result_output_dir / "STATUS"
    status = file_read_text_or_else(status_file, "UNEXPECTED_ERROR")

    report_subdirectory_name = ""

    if status == "CRASH":
        report_subdirectory_name = "crashes"
    elif status == "HOST_CRASH":
        report_subdirectory_name = "host_crashes"

    if report_subdirectory_name:
        log_path = result_output_dir / "log.txt"
        report_dir = move_test_to_crash_report_using_log_signature(
            log_path, test_dir, reports_dir, report_subdirectory_name
        )

        run_reduction(report_dir, device_name)
        return report_dir

    # No report generated.
    return None


def run_shader_job(shader_job: Path, output_dir: Path, test_glsl: TestGlsl) -> Path:

    with file_open_text(output_dir / "log.txt", "w") as log_file:
        try:
            gflogging.push_stream_for_logging(log_file)

            binary_paths = BinaryPaths()

            # TODO: Catch exceptions for glslang, spirv-opt, etc.

            try:

                amber_script_file = glsl_shader_job_to_amber_script(
                    shader_job,
                    output_dir / "test.amber",
                    output_dir,
                    binary_paths,
                    AmberfySettings(
                        spirv_opt_args=list(test_glsl.spirv_opt_args),
                        spirv_opt_hash=binary_paths.spirv_opt_hash,
                    ),
                    spirv_opt_args=list(test_glsl.spirv_opt_args),
                )
            except SubprocessError:
                file_write_text(output_dir / "STATUS", "HOST_CRASH")
                return output_dir

            # Do something different here depending on the device.

            is_compute = bool(shader_job_get_related_files(shader_job, [EXT_COMP]))

            run_amber_on_device(
                amber_script_file,
                output_dir,
                dump_image=(not is_compute),
                dump_buffer=is_compute,
            )

            log_a_file(output_dir / "amber_log.txt")

            return output_dir

        finally:
            gflogging.pop_stream_for_logging()


if __name__ == "__main__":
    main()
    sys.exit(0)
