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
import shutil
import subprocess
import sys
import uuid
from pathlib import Path
from typing import Iterator, Match, Optional, List

from gfauto import (
    host_device_util,
    devices_util,
    util,
    test_util,
    shader_job_util,
    recipe_glsl_reference_shader_job_to_glsl_variant_shader_job,
    recipe_spirv_shader_job_to_spirv_shader_job_opt,
    subprocess_util,
    result_util,
    gflogging,
    tool,
    recipe_spirv_asm_shader_job_to_amber_script,
    android_device,
    built_in_binaries,
    settings_util,
    artifacts,
)
from gfauto.device_pb2 import Device
from gfauto.gflogging import log
from gfauto.test_pb2 import Test, TestGlsl
from gfauto.util import check


def get_random_name() -> str:
    # TODO: could change to human-readable random name or the date.
    return uuid.uuid4().hex


IMAGE_FILE_NAME = "image.png"
BUFFER_FILE_NAME = "buffer.bin"

BEST_REDUCTION_NAME = "best"

AMBER_RUN_TIME_LIMIT = 30

STATUS_TOOL_CRASH = "TOOL_CRASH"
STATUS_TOOL_TIMEOUT = "TOOL_TIMEOUT"
STATUS_SUCCESS = "SUCCESS"


def make_subtest(
    base_source_dir: Path,
    subtest_dir: Path,
    spirv_opt_args: Optional[List[str]],
    binary_manager: built_in_binaries.BinaryManager,
) -> Path:
    # Create the subtest by copying the base source.
    util.copy_dir(base_source_dir, test_util.get_source_dir(subtest_dir))

    test = Test(glsl=TestGlsl(spirv_opt_args=spirv_opt_args))

    test.binaries.extend([binary_manager.get_binary_by_name(name="glslangValidator")])
    test.binaries.extend([binary_manager.get_binary_by_name(name="spirv-dis")])
    test.binaries.extend([binary_manager.get_binary_by_name(name="spirv-val")])
    if spirv_opt_args:
        test.binaries.extend([binary_manager.get_binary_by_name(name="spirv-opt")])

    # Write the test metadata.
    test_util.metadata_write(test, subtest_dir)

    return subtest_dir


class NoSettingsFile(Exception):
    def __init__(self, message: str):
        super().__init__(message)


def main() -> None:
    # TODO: Use sys.argv[1:].

    try:
        settings = settings_util.read()
    except FileNotFoundError as exception:
        settings_util.write_default()
        raise NoSettingsFile(
            f"Could not find {settings_util.SETTINGS_FILE_PATH}. "
            "A default settings file has been created for you. "
            "Please review it and then run fuzz again. "
        ) from exception

    active_devices = devices_util.get_active_devices(settings.device_list)

    reports_dir = Path() / "reports"
    temp_dir = Path() / "temp"
    donors_dir = Path() / "donors"
    references = sorted(donors_dir.rglob("*.json"))

    if donors_dir.exists():
        try:
            artifacts.artifact_path_get_root()
        except FileNotFoundError:
            log(
                "Could not find ROOT file (in the current directory or above) to mark where binaries should be stored. "
                "Creating a ROOT file in the current directory."
            )
            util.file_write_text(Path(artifacts.ARTIFACT_ROOT_FILE_NAME), "")

    artifacts.recipes_write_built_in()

    # TODO: make GraphicsFuzz find donors recursively.

    # Filter to only include .json files that have at least one shader (.frag, .vert, .comp) file.
    references = [ref for ref in references if shader_job_util.get_related_files(ref)]

    binary_manager = built_in_binaries.BinaryManager(
        list(settings.default_binaries) + built_in_binaries.DEFAULT_BINARIES,
        util.get_platform(),
        binary_artifacts_prefix=built_in_binaries.BUILT_IN_BINARY_RECIPES_PATH_PREFIX,
    )

    # For convenience, we add the default (i.e. newest) SwiftShader ICD (binary) to any swift_shader devices
    # so that we don't need to specify it and update it in the device list (on disk).
    for device in active_devices:
        if device.HasField("swift_shader"):
            just_swift_binaries = [
                binary
                for binary in device.binaries
                if "swift" not in binary.name.lower()
            ]
            if len(list(just_swift_binaries)) == 0:
                device.binaries.extend(
                    [binary_manager.get_binary_by_name("swift_shader_icd")]
                )

    while True:
        iteration_seed = random.randint(util.MIN_SIGNED_INT_32, util.MAX_SIGNED_INT_32)

        log(f"Iteration seed: {iteration_seed}")
        random.seed(iteration_seed)

        test_name = get_random_name()
        test_dir = temp_dir / test_name

        base_source_dir = test_dir / "base_source"

        # Copy in a randomly chosen reference.
        reference_glsl_shader_job = shader_job_util.copy(
            random.choice(references),
            base_source_dir / test_util.REFERENCE_DIR / test_util.SHADER_JOB,
        )

        # Pick a seed.
        seed = random.randint(-pow(2, 31), pow(2, 31) - 1)

        recipe_glsl_reference_shader_job_to_glsl_variant_shader_job.run_generate(
            util.tool_on_path("graphicsfuzz-tool"),
            reference_glsl_shader_job,
            donors_dir,
            util.mkdirs_p(base_source_dir / test_util.VARIANT_DIR)
            / test_util.SHADER_JOB,
            str(seed),
        )

        subtest_dirs = [
            make_subtest(
                base_source_dir,
                test_dir / f"{test_name}_no_opt_test",
                spirv_opt_args=None,
                binary_manager=binary_manager,
            ),
            make_subtest(
                base_source_dir,
                test_dir / f"{test_name}_opt_O_test",
                spirv_opt_args=["-O"],
                binary_manager=binary_manager,
            ),
            make_subtest(
                base_source_dir,
                test_dir / f"{test_name}_opt_Os_test",
                spirv_opt_args=["-Os"],
                binary_manager=binary_manager,
            ),
            make_subtest(
                base_source_dir,
                test_dir / f"{test_name}_opt_rand1_test",
                spirv_opt_args=recipe_spirv_shader_job_to_spirv_shader_job_opt.random_spirv_opt_args(),
                binary_manager=binary_manager,
            ),
            make_subtest(
                base_source_dir,
                test_dir / f"{test_name}_opt_rand2_test",
                spirv_opt_args=recipe_spirv_shader_job_to_spirv_shader_job_opt.random_spirv_opt_args(),
                binary_manager=binary_manager,
            ),
            make_subtest(
                base_source_dir,
                test_dir / f"{test_name}_opt_rand3_test",
                spirv_opt_args=recipe_spirv_shader_job_to_spirv_shader_job_opt.random_spirv_opt_args(),
                binary_manager=binary_manager,
            ),
        ]

        for subtest_dir in subtest_dirs:
            if handle_test(subtest_dir, reports_dir, active_devices, binary_manager):
                # If we generated a report, don't bother trying other optimization combinations.
                break

        shutil.rmtree(test_dir)


def handle_test(
    test_dir: Path,
    reports_dir: Path,
    active_devices: List[Device],
    binary_manager: built_in_binaries.BinaryManager,
) -> bool:
    test = test_util.metadata_read(test_dir)
    if test.HasField("glsl"):
        return handle_glsl_test(
            test, test_dir, reports_dir, active_devices, binary_manager
        )
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
PATTERN_GLSLANG_ERROR = re.compile(r"\w+:\d+: '([^'\n]+)'")


# E.g. /data/local/tmp/graphicsfuzz/test.amber: 256: probe ssbo format does not match buffer format
#                                             : 256: probe ssbo format does not match buffer format
#                                                    probe ssbo format does not match buffer format
PATTERN_AMBER_ERROR = re.compile(r"\w: \d+: ([\w ]+)$")

# E.g. error: line 0: Module contains unreachable blocks during merge return.  Run dead branch elimination before merge return.
#      error: line 0: Module contains unreachable blocks during merge return.  Run dead branch elimination before merge return.
#                     Module contains unreachable blocks during merge return.  Run dead branch elimination before merge return.
PATTERN_SPIRV_OPT_ERROR = re.compile(r"^error: line \d+: ([^\n]+)")

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


def move_test_to_crash_report_using_log_signature(
    log_path: Path, test_dir: Path, reports_dir: Path, crash_subdirectory_name: str
) -> Path:
    log_contents = util.file_read_text(log_path)
    signature = get_signature_from_log_contents(log_contents)
    output_test_dir = util.move_dir(
        test_dir, reports_dir / crash_subdirectory_name / signature / test_dir.name
    )
    test = test_util.metadata_read(output_test_dir)
    test.crash_signature = signature
    test_util.metadata_write(test, output_test_dir)
    return output_test_dir


# What we need:
#  - A test should create a clone of itself, specialized for one specific device (e.g. device serial and crash string).
#    - It may have results for multiple devices (for extra information), but the result for the target device is the
#      main one. So, we can run a test on multiple devices and get results. At the end, we can check the results and
#      then clone it for each device if a bug was found (updating the device and crash signature), and including all the
#      results.
#    - When cloning each test to become a bug report, we will need to add the device name into the directory name to
#      ensure it is unique, although it should be unlikely to clash except for common crash signatures like
#      "compile_error".
#    - We can reduce such a cloned test without any extra information.

# GLSL temp dir:
# - 123/ (not a proper test_dir, as it only has "base_source", not "source".
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
#           - (all other result files and intermediate files for running the shader on the device)
#         - reductions/
#           - reduction_1/ reduction_blah/ etc. (reduction name; also a test_dir)
#             - source/ (same as other source dirs, but with the final reduced shader source)
#             - reduction_work/
#               - reference/ variant/
#                 - shader.json, shader_reduction_001_success.json,
#                 shader_reduction_002_failed.json, etc., shader_reduced_final.json
#                 - shader/ shader_reduction_001/
#                 (these are the result directories for each step, containing STATUS, etc.)
#             - results/ (a final run of the reduced shader on the target device, and maybe other devices)
#               - pixel/ other_phone/ laptop/ etc.
#                 - reference/ variant/
#


def run_glsl_reduce(
    input_shader_job: Path,
    test_metadata_path: Path,
    output_dir: Path,
    preserve_semantics: bool = False,
) -> Path:

    cmd = [
        "glsl-reduce",
        str(input_shader_job),
        "--output",
        str(output_dir),
        "--",
        "gfauto_interestingness_test",
        str(test_metadata_path),
    ]

    if preserve_semantics:
        cmd.insert(1, "--preserve-semantics")

    # Log the reduction.
    with util.file_open_text(output_dir / "command.log", "w") as f:
        gflogging.push_stream_for_logging(f)
        try:
            # The reducer can fail, but it will typically output an exception file, so we can ignore the exit code.
            subprocess_util.run(cmd, verbose=True, check_exit_code=False)
        finally:
            gflogging.pop_stream_for_logging()

    return output_dir


def get_final_reduced_shader_job_path(reduction_work_shader_dir: Path) -> Path:
    return reduction_work_shader_dir / "shader_reduced_final.json"


class ReductionFailedError(Exception):
    def __init__(self, message: str, reduction_name: str, reduction_work_dir: Path):
        super().__init__(message)
        self.reduction_name = reduction_name
        self.reduction_work_dir = reduction_work_dir


def run_reduction(
    test_dir_reduction_output: Path,
    test_dir_to_reduce: Path,
    preserve_semantics: bool,
    reduction_name: str = "reduction1",
    device_name: Optional[str] = None,
) -> Path:
    test = test_util.metadata_read(test_dir_to_reduce)

    if not device_name and not test.device:
        raise AssertionError(
            f"Cannot reduce {str(test_dir_to_reduce)}; device must be specified in {str(test_util.get_metadata_path(test_dir_to_reduce))}"
        )

    if not device_name:
        device_name = test.device.name

    if not test.crash_signature:
        raise AssertionError(
            f"Cannot reduce {str(test_dir_to_reduce)} because there is no crash string specified; "
            f"for now, only crash reductions are supported"
        )

    reduced_test_dir_1 = test_util.get_reduced_test_dir(
        test_dir_reduction_output, device_name, reduction_name
    )

    reduction_work_variant_dir = run_glsl_reduce(
        input_shader_job=test_util.get_shader_job_path(
            test_dir_to_reduce, is_variant=True
        ),
        test_metadata_path=test_util.get_metadata_path(test_dir_to_reduce),
        output_dir=test_util.get_reduction_work_directory(
            reduced_test_dir_1, is_variant=True
        ),
        preserve_semantics=preserve_semantics,
    )

    final_reduced_shader_job_path = get_final_reduced_shader_job_path(
        reduction_work_variant_dir
    )

    check(
        final_reduced_shader_job_path.exists(),
        ReductionFailedError(
            "Reduction failed; not yet handled",
            reduction_name,
            reduction_work_variant_dir,
        ),
    )

    # Finally, write the test metadata and shader job, so the returned directory can be used as a test_dir.

    test_util.metadata_write(test, reduced_test_dir_1)

    shader_job_util.copy(
        final_reduced_shader_job_path,
        test_util.get_shader_job_path(reduced_test_dir_1, is_variant=True),
    )

    return reduced_test_dir_1


def handle_glsl_test(
    test: Test,
    test_dir: Path,
    reports_dir: Path,
    active_devices: List[Device],
    binary_manager: built_in_binaries.BinaryManager,
) -> bool:

    report_paths: List[Path] = []
    issue_found = False

    # Run on all devices.
    for device in active_devices:
        log(f"Running test on device:\n{device.name}")

        result_output_dir = run_shader_job(
            test_util.get_shader_job_path(test_dir, is_variant=True),
            test_util.get_results_directory(test_dir, device.name, is_variant=True),
            test,
            device,
            binary_manager,
        )

        status = result_util.get_status(result_output_dir)

        if status == STATUS_TOOL_CRASH:
            # No need to run further on real devices if the pre-processing step failed.
            break

    # For each device that saw a crash, copy the test to reports_dir, adding the signature and device info to the test
    # metadata.
    # TODO: Consider moving the device binaries list into test.binaries?
    for device in active_devices:

        result_output_dir = test_util.get_results_directory(
            test_dir, device.name, is_variant=True
        )

        status = result_util.get_status(result_output_dir)

        report_subdirectory_name = ""

        if status == "CRASH":
            report_subdirectory_name = "crashes"
        elif status == STATUS_TOOL_CRASH:
            report_subdirectory_name = "tool_crashes"

        if report_subdirectory_name:
            issue_found = True
            log_path = result_util.get_log_path(result_output_dir)

            log_contents = util.file_read_text(log_path)
            signature = get_signature_from_log_contents(log_contents)

            # We include the device name in the directory name because it is possible that this test crashes on two
            # different devices but gives the same crash signature in both cases (e.g. for generic signatures
            # like "compile_error"). This would lead to two test copies having the same path.
            signature_dir = reports_dir / report_subdirectory_name / signature

            # If the signature_dir contains a NOT_INTERESTING file, then don't bother creating a report.
            if not (signature_dir / "NOT_INTERESTING").exists():
                test_dir_in_reports = signature_dir / f"{test_dir.name}_{device.name}"

                util.copy_dir(test_dir, test_dir_in_reports)

                test_metadata = test_util.metadata_read(test_dir_in_reports)
                test_metadata.crash_signature = signature
                test_metadata.device.CopyFrom(device)
                test_util.metadata_write(test_metadata, test_dir_in_reports)

                report_paths.append(test_dir_in_reports)

    # For each report, run a reduction on the target device with the device-specific crash signature.
    for test_dir_in_reports in report_paths:

        test_metadata = test_util.metadata_read(test_dir_in_reports)

        try:

            part_1_reduced_test = run_reduction(
                test_dir_reduction_output=test_dir_in_reports,
                test_dir_to_reduce=test_dir_in_reports,
                preserve_semantics=True,
                reduction_name="part_1_preserve_semantics",
            )

            part_2_reduced_test = run_reduction(
                test_dir_reduction_output=test_dir_in_reports,
                test_dir_to_reduce=part_1_reduced_test,
                preserve_semantics=False,
                reduction_name="part_2_change_semantics",
            )

            device_name = test_metadata.device.name

            # Create a symlink to the "best" reduction.
            best_reduced_test_link = test_util.get_reduced_test_dir(
                test_dir_in_reports, device_name, BEST_REDUCTION_NAME
            )
            util.make_directory_symlink(
                new_symlink_file_path=best_reduced_test_link,
                existing_dir=part_2_reduced_test,
            )
        except ReductionFailedError as ex:
            # Create a symlink to the failed reduction so it is easy to investigate failed reductions.
            link_to_failed_reduction_path = (
                reports_dir
                / "failed_reductions"
                / f"{test_dir_in_reports.name}_{ex.reduction_name}"
            )
            util.make_directory_symlink(
                new_symlink_file_path=link_to_failed_reduction_path,
                existing_dir=ex.reduction_work_dir,
            )

    # For each report, create a summary and reproduce the bug.
    for test_dir_in_reports in report_paths:
        create_summary_and_reproduce(test_dir_in_reports, binary_manager)

    return issue_found


def create_summary_and_reproduce(
    test_dir: Path,
    binary_manager: built_in_binaries.BinaryManager,
    device: Optional[Device] = None,
) -> None:
    util.mkdirs_p(test_dir / "summary")
    test_metadata = test_util.metadata_read(test_dir)
    if test_metadata.HasField("glsl"):
        create_summary_and_reproduce_glsl(test_dir, binary_manager, device)
    else:
        raise AssertionError("Unrecognized test type")


def create_summary_and_reproduce_glsl(
    test_dir: Path,
    binary_manager: built_in_binaries.BinaryManager,
    device: Optional[Device] = None,
) -> None:
    test_metadata = test_util.metadata_read(test_dir)
    if not device:
        device = test_metadata.device

    summary_dir = test_dir / "summary"

    unreduced_glsl = util.copy_dir(
        test_util.get_source_dir(test_dir), summary_dir / "unreduced_glsl"
    )

    reduced_test_dir = test_util.get_reduced_test_dir(
        test_dir, test_metadata.device.name, BEST_REDUCTION_NAME
    )
    reduced_source_dir = test_util.get_source_dir(reduced_test_dir)
    reduced_glsl = util.copy_dir(reduced_source_dir, summary_dir / "reduced_glsl")

    run_shader_job(
        unreduced_glsl / test_util.VARIANT_DIR / test_util.SHADER_JOB,
        summary_dir / "unreduced_glsl_result" / test_util.VARIANT_DIR,
        test_metadata,
        device,
        binary_manager,
    )

    variant_reduced_glsl_result = run_shader_job(
        reduced_glsl / test_util.VARIANT_DIR / test_util.SHADER_JOB,
        summary_dir / "reduced_glsl_result" / test_util.VARIANT_DIR,
        test_metadata,
        device,
        binary_manager,
    )

    # Some post-processing for common error types.

    status = result_util.get_status(variant_reduced_glsl_result)
    if status == STATUS_TOOL_CRASH:
        # Create a simple script and README.

        shader_job = unreduced_glsl / test_util.VARIANT_DIR / test_util.SHADER_JOB

        shader_files = shader_job_util.get_related_files(
            shader_job, shader_job_util.EXT_ALL
        )
        check(
            len(shader_files) > 0,
            AssertionError(f"Need at least one shader for {shader_job}"),
        )

        shader_extension = shader_files[0].suffix

        bug_report_dir = util.copy_dir(
            variant_reduced_glsl_result, summary_dir / "bug_report"
        )

        shader_files = sorted(bug_report_dir.rglob("shader.*"))

        glsl_files = [
            shader_file
            for shader_file in shader_files
            if shader_file.suffix == shader_extension
        ]

        asm_files = [
            shader_file
            for shader_file in shader_files
            if shader_file.name.endswith(
                shader_extension + shader_job_util.SUFFIX_ASM_SPIRV
            )
        ]

        spv_files = [
            shader_file
            for shader_file in shader_files
            if shader_file.name.endswith(
                shader_extension + shader_job_util.SUFFIX_SPIRV
            )
        ]

        readme = "\n\n"
        readme += "Issue found using [GraphicsFuzz](https://github.com/google/graphicsfuzz).\n\n"
        readme += "Tool versions:\n\n"
        readme += f"* glslangValidator commit hash: {binary_manager.get_binary_by_name(built_in_binaries.GLSLANG_VALIDATOR_NAME).version}\n"

        if test_metadata.glsl.spirv_opt_args:
            readme += f"* spirv-opt commit hash: {binary_manager.get_binary_by_name(built_in_binaries.SPIRV_OPT_NAME).version}\n"

        readme += "\nTo reproduce:\n\n"
        readme += f"`glslangValidator -V shader{shader_extension} -o shader{shader_extension}.spv`\n\n"

        if spv_files and not test_metadata.glsl.spirv_opt_args:
            # There was an .spv file and no spirv-opt, so validate the SPIR-V.
            readme += f"`spirv-val shader{shader_extension}.spv`\n\n"

        if test_metadata.glsl.spirv_opt_args:
            readme += f"`spirv-opt shader{shader_extension}.spv -o temp.spv --validate-after-all {' '.join(test_metadata.glsl.spirv_opt_args)}`\n\n"

        files_to_list = glsl_files + spv_files + asm_files
        files_to_list.sort()

        files_to_show = glsl_files + asm_files
        files_to_show.sort()

        readme += "The following shader files are included in the attached archive, some of which are also shown inline below:\n\n"

        for file_to_list in files_to_list:
            short_path = file_to_list.relative_to(bug_report_dir).as_posix()
            readme += f"* {short_path}\n"

        for file_to_show in files_to_show:
            short_path = file_to_show.relative_to(bug_report_dir).as_posix()
            contents = util.file_read_text(file_to_show)
            readme += f"\n{short_path}:\n\n"
            readme += "```\n" + contents + "\n```\n"

        util.file_write_text(summary_dir / "README.md", readme)


def result_get_amber_log_path(result_dir: Path) -> Path:
    return result_dir / "amber_log.txt"


def run_shader_job(
    shader_job: Path,
    output_dir: Path,
    test: Test,
    device: Device,
    binary_manager: built_in_binaries.BinaryManager,
) -> Path:

    with util.file_open_text(output_dir / "log.txt", "w") as log_file:
        try:
            gflogging.push_stream_for_logging(log_file)

            binary_paths = binary_manager.get_child_binary_manager(
                list(device.binaries) + list(test.binaries)
            )

            # TODO: Find amber path. NDK or host.

            # TODO: If Amber is going to be used, check if Amber can use Vulkan debug layers now, and if not, pass that
            #  info down via a bool.

            try:

                spirv_opt_hash: Optional[str] = None
                if test.glsl.spirv_opt_args:
                    spirv_opt_hash = binary_paths.get_binary_by_name(
                        built_in_binaries.SPIRV_OPT_NAME
                    ).version

                amber_script_file = tool.glsl_shader_job_to_amber_script(
                    shader_job,
                    output_dir / "test.amber",
                    output_dir,
                    binary_paths,
                    recipe_spirv_asm_shader_job_to_amber_script.AmberfySettings(
                        spirv_opt_args=list(test.glsl.spirv_opt_args),
                        spirv_opt_hash=spirv_opt_hash,
                    ),
                    spirv_opt_args=list(test.glsl.spirv_opt_args),
                )
            except subprocess.CalledProcessError:
                util.file_write_text(
                    result_util.get_status_path(output_dir), STATUS_TOOL_CRASH
                )
                return output_dir
            except subprocess.TimeoutExpired:
                util.file_write_text(
                    result_util.get_status_path(output_dir), STATUS_TOOL_TIMEOUT
                )
                return output_dir

            is_compute = bool(
                shader_job_util.get_related_files(
                    shader_job, [shader_job_util.EXT_COMP]
                )
            )

            # Consider device type.

            if device.HasField("preprocess"):
                # The "preprocess" device type just needs to get this far, so this is a success.
                util.file_write_text(
                    result_util.get_status_path(output_dir), STATUS_SUCCESS
                )
                return output_dir

            if device.HasField("host") or device.HasField("swift_shader"):
                icd: Optional[Path] = None

                if device.HasField("swift_shader"):
                    icd = binary_paths.get_binary_path_by_name(
                        built_in_binaries.SWIFT_SHADER_NAME
                    ).path

                # Run the shader on the host using Amber.
                host_device_util.run_amber(
                    amber_script_file,
                    output_dir,
                    dump_image=(not is_compute),
                    dump_buffer=is_compute,
                    icd=icd,
                )
                return output_dir

            if device.HasField("android"):

                android_device.run_amber_on_device(
                    amber_script_file,
                    output_dir,
                    dump_image=(not is_compute),
                    dump_buffer=is_compute,
                    serial=device.android.serial,
                )
                return output_dir

            # TODO: For a remote device (which we will probably need to support), use log_a_file to output the
            #  "amber_log.txt" file.

            raise AssertionError(f"Unhandled device type:\n{str(device)}")

        finally:
            gflogging.pop_stream_for_logging()


if __name__ == "__main__":
    main()
    sys.exit(0)
