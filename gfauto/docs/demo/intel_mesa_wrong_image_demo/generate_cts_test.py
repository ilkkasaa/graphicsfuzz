#!/usr/bin/env python3
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

import sys
from pathlib import Path

from gfauto import tool, artifact_util, binaries_util, amber_converter


def main() -> None:

    artifact_util.recipes_write_built_in()

    binary_manager = binaries_util.BinaryManager()

    tool.glsl_shader_job_crash_to_amber_script_for_google_cts(
        input_json=Path() / "reference.json",
        output_amber=Path() / "temp" / "reference.amber",
        work_dir=Path() / "temp" / "reference_work",
        short_description="The reference.",
        comment_text="",
        copyright_year="2019",
        extra_commands="",
        binary_paths=binary_manager,
    )

    tool.glsl_shader_job_crash_to_amber_script_for_google_cts(
        input_json=Path() / "variant_008_reduced_final.json",
        output_amber=Path() / "temp" / "variant_008_reduced_final.amber",
        work_dir=Path() / "temp" / "variant_008_reduced_final_work",
        short_description="The variant.",
        comment_text="",
        copyright_year="2019",
        extra_commands="",
        binary_paths=binary_manager,
    )

    # Bit of a hack (uses the intermediate outputs of the above calls), but this is the function that needs work.

    amber_converter.spirv_asm_shader_job_to_amber_script(
        shader_job_file_amber_test=amber_converter.ShaderJobFileBasedAmberTest(
            reference_asm_spirv_job=amber_converter.ShaderJobFile(
                name_prefix="reference",
                asm_spirv_shader_job_json=Path() / "temp" / "reference_work" / "1_spirv_asm" / "reference.json",
                glsl_source_json=Path() / "temp" / "reference_work" / "0_glsl" / "reference.json",
                processing_info="",
            ),
            variant_asm_spirv_job=amber_converter.ShaderJobFile(
                name_prefix="variant",
                asm_spirv_shader_job_json=Path() / "temp" / "variant_008_reduced_final_work" / "1_spirv_asm" / "variant_008_reduced_final.json",
                glsl_source_json=Path() / "temp" / "variant_008_reduced_final_work" / "0_glsl" / "variant_008_reduced_final.json",
                processing_info="",
            ),
        ),
        output_amber_script_file_path=Path() / "temp" / "combined.amber",
        amberfy_settings=amber_converter.AmberfySettings(),
    )


if __name__ == "__main__":
    main()
    sys.exit(0)
