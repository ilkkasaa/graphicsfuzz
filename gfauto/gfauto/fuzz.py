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
from typing import List, Match

from gfauto import gflogging
from gfauto.android_device import run_amber_on_device
from gfauto.gflogging import log, log_a_file
from gfauto.recipe_spirv_asm_shader_job_to_amber_script import AmberfySettings
from gfauto.shader_job_util import EXT_COMP, shader_job_copy
from gfauto.test_pb2 import Test, TestGlsl
from gfauto.tool import BinaryPaths, glsl_shader_job_to_amber_script
from gfauto.util import (
    copy_dir,
    copy_file,
    file_open_text,
    file_read_text,
    file_read_text_or_else,
    file_write_text,
    test_metadata_read,
    test_metadata_write,
)

from .recipe_glsl_reference_shader_job_to_glsl_variant_shader_job import run_generate
from .shader_job_util import shader_job_get_related_files


def get_random_name():
    # TODO: could change to human-readable random name or the date.
    return uuid.uuid4().hex


REFERENCE_DIR = "reference"
VARIANT_DIR = "variant"
SHADER_JOB = "shader.json"
SHADER_JOB_RESULT = "shader.info.json"


def main(args):
    reports_dir = Path() / "reports"
    temp_dir = Path() / "temp"
    donors_dir = Path() / "donors"
    references = sorted(donors_dir.rglob("*.json"))

    # Filter to only include .json files that have at least one shader (.frag, .vert, .comp) file.
    references = [ref for ref in references if shader_job_get_related_files(ref)]

    while True:
        work_dir = temp_dir / get_random_name()

        base_test_dir = work_dir / "base_test"

        # Copy in a randomly chosen reference.
        reference_glsl_shader_job = shader_job_copy(
            random.choice(references), base_test_dir / REFERENCE_DIR / SHADER_JOB
        )

        # Pick a seed.
        seed = random.randint()

        run_generate(
            reference_glsl_shader_job,
            base_test_dir,
            work_dir / VARIANT_DIR / SHADER_JOB,
            seed,
        )

        test_dirs = []  # type: List[Path]

        # no_opt_test, opt_O, opt_Os, opt_rand1, opt_rand2, opt_rand3, etc.

        # Create the no_opt_test by copying the base test.
        no_opt_test_dir = copy_dir(base_test_dir, work_dir / "no_opt_test")

        # Write the test metadata.
        test_metadata_write(
            Test(
                glsl=TestGlsl(
                    glslang_version_hash="",
                    spirv_opt_version_hash="",
                    spirv_opt_args=None,
                )
            ),
            no_opt_test_dir,
        )

        test_dirs.append(no_opt_test_dir)

        for test_dir in test_dirs:
            handle_test(test_dir, test_dir.parent / "results", reports_dir)


def handle_test(test_dir: Path, results_dir: Path, reports_dir: Path):
    test = test_metadata_read(test_dir)
    if test.HasField("glsl"):
        handle_glsl_test(test.glsl, test_dir, results_dir, reports_dir)
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


def get_signature_from_log_contents(log_contents: str) -> str:

    if log_contents.find("Shader compilation failed") != -1:
        return "compile_error"

    if log_contents.find("Calling vkCreateGraphicsPipelines Fail") != -1:
        return "pipeline_failure"

    # TODO: Check for Amber fence failure.

    if log_contents.find("#00 pc") != -1:
        lines = log_contents.split("\n")
        for line in lines:
            pc_pos = line.find("#00 pc")
            if pc_pos == -1:
                continue
            line = line[pc_pos:]

            if line.find("/amber_ndk") != -1:
                return "amber_ndk"

            cpp_function_matches = re.finditer(PATTERN_CPP_FUNCTION, line)
            cpp_function_match = next(cpp_function_matches, None)  # type: Match
            if cpp_function_match:
                return cpp_function_match.group(1)

            c_function_matches = re.finditer(PATTERN_C_FUNCTION, line)
            c_function_match = next(c_function_matches, None)  # type: Match
            if c_function_match:
                return c_function_match.group(1)

            # TODO: More.

            break

    return "no_signature"


def handle_glsl_test(
    test: TestGlsl, test_dir: Path, results_dir: Path, reports_dir: Path
):
    # Maybe try just on spirv-opt first.

    # Run it on several devices, etc.

    # For now, just run the variant on the one device and see if it crashes.

    output_dir = run_shader_job(
        test_dir / VARIANT_DIR / SHADER_JOB,
        results_dir / "android_device" / VARIANT_DIR,
        test,
    )

    status_file = output_dir / "STATUS"
    status = file_read_text_or_else(status_file, "UNEXPECTED_ERROR")

    if status != "CRASH":
        return

    log_contents = file_read_text(output_dir / "log.txt")

    signature = get_signature_from_log_contents(log_contents)

    copy_dir(out)


def run_shader_job(shader_job: Path, output_dir: Path, test_glsl: TestGlsl) -> Path:

    with file_open_text(output_dir / "log.txt", "w") as log_file:
        try:
            gflogging.push_stream_for_logging(log_file)

            binary_paths = BinaryPaths()

            # TODO: Catch exceptions for glslang, spirv-opt, etc.

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

            # Do something different here depending on the device.

            is_compute = bool(shader_job_get_related_files(shader_job, EXT_COMP))

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
    main(sys.argv[1:])
    sys.exit(0)
