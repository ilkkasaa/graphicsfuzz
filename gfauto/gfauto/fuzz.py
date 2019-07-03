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
import shutil
import sys
import uuid
from pathlib import Path
from typing import Optional, List

from gfauto import (
    devices_util,
    util,
    test_util,
    shader_job_util,
    recipe_glsl_reference_shader_job_to_glsl_variant_shader_job,
    recipe_spirv_shader_job_to_spirv_shader_job_opt,
    built_in_binaries,
    settings_util,
    artifacts,
    fuzz_glsl_test,
)
from gfauto.device_pb2 import Device
from gfauto.gflogging import log
from gfauto.test_pb2 import Test, TestGlsl

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


IMAGE_FILE_NAME = "image.png"
BUFFER_FILE_NAME = "buffer.bin"

BEST_REDUCTION_NAME = "best"

AMBER_RUN_TIME_LIMIT = 30

STATUS_TOOL_CRASH = "TOOL_CRASH"
STATUS_TOOL_TIMEOUT = "TOOL_TIMEOUT"
STATUS_SUCCESS = "SUCCESS"


def get_random_name() -> str:
    # TODO: could change to human-readable random name or the date.
    return uuid.uuid4().hex


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
        return fuzz_glsl_test.handle_glsl_test(
            test, test_dir, reports_dir, active_devices, binary_manager
        )
    else:
        raise AssertionError("Unrecognized test type")


def create_summary_and_reproduce(
    test_dir: Path,
    binary_manager: built_in_binaries.BinaryManager,
    device: Optional[Device] = None,
) -> None:
    util.mkdirs_p(test_dir / "summary")
    test_metadata = test_util.metadata_read(test_dir)
    if test_metadata.HasField("glsl"):
        fuzz_glsl_test.create_summary_and_reproduce_glsl(
            test_dir, binary_manager, device
        )
    else:
        raise AssertionError("Unrecognized test type")


if __name__ == "__main__":
    main()
    sys.exit(0)
