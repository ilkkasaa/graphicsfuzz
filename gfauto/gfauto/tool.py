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

from pathlib import Path
from typing import List, Optional

from .artifacts import (
    artifact_execute_recipe_if_needed,
    artifact_find_binary,
    recipes_write_built_in,
)
from .gflogging import log
from .recipe_glsl_shader_job_to_spirv_shader_job import (
    GLSLANG_VALIDATOR_NAME,
    run_glslang_glsl_to_spirv_job,
)
from .recipe_spirv_asm_shader_job_to_amber_script import (
    AmberfySettings,
    run_spirv_asm_shader_job_to_amber_script,
)
from .recipe_spirv_shader_job_to_spirv_asm_shader_job import (
    SPIRV_DIS_NAME,
    run_spirv_shader_job_to_spirv_asm_shader_job,
)
from .recipe_spirv_shader_job_to_spirv_shader_job_opt import (
    SPIRV_OPT_NAME,
    run_spirv_opt_on_spirv_shader_job,
)
from .util import file_read_text

AMBER_COMMAND_PROBE_TOP_LEFT_RED = "probe rgba (0, 0) (1, 0, 0, 1)\n"


class BinaryPaths:
    def __init__(
        self,
        glslang_binary: Optional[Path] = None,
        spirv_opt_binary: Optional[Path] = None,
        spirv_opt_hash: Optional[str] = None,
        spirv_dis_binary: Optional[Path] = None,
    ):
        self.glslang_binary = glslang_binary
        self.spirv_opt_binary = spirv_opt_binary
        self.spirv_opt_hash = spirv_opt_hash
        self.spirv_dis_binary = spirv_dis_binary


def get_copyright_header_google(year: str) -> str:
    return f"""Copyright {year} Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
"""


BINARY_SUFFIX_VERSION = ".version"


def get_binary_paths_using_artifact_system(artifact_path: str) -> BinaryPaths:
    recipes_write_built_in()
    artifact_execute_recipe_if_needed(artifact_path)
    binary_paths = BinaryPaths()

    binary_paths.glslang_binary = artifact_find_binary(
        artifact_path, GLSLANG_VALIDATOR_NAME
    )
    binary_paths.spirv_opt_binary = artifact_find_binary(artifact_path, SPIRV_OPT_NAME)
    if binary_paths.spirv_opt_binary:
        version_file_path = binary_paths.spirv_opt_binary.with_suffix(
            BINARY_SUFFIX_VERSION
        )
        try:
            binary_paths.spirv_opt_hash = file_read_text(version_file_path).strip()
        except IOError as error:
            log(f"Could not find version hash: {error}")
    binary_paths.spirv_dis_binary = artifact_find_binary(artifact_path, SPIRV_DIS_NAME)
    return binary_paths


def amberfy(
    input_json: Path,
    output_amber: Path,
    amberfy_settings: AmberfySettings,
    input_glsl_source_json_path: Optional[Path] = None,
) -> Path:
    return run_spirv_asm_shader_job_to_amber_script(
        input_json, output_amber, amberfy_settings, input_glsl_source_json_path
    )


def spirv_dis_shader_job(
    input_json: Path, output_json: Path, binary_paths: BinaryPaths
) -> Path:
    return run_spirv_shader_job_to_spirv_asm_shader_job(
        input_json, output_json, binary_paths.spirv_dis_binary
    )


def spirv_opt_shader_job(
    input_json: Path,
    spirv_opt_args: List[str],
    output_json: Path,
    binary_paths: BinaryPaths,
) -> Path:
    return run_spirv_opt_on_spirv_shader_job(
        input_json, output_json, spirv_opt_args, binary_paths.spirv_opt_binary
    )


def glslang_glsl_shader_job_to_spirv(
    input_json: Path, output_json: Path, binary_paths: BinaryPaths
) -> Path:
    return run_glslang_glsl_to_spirv_job(
        input_json, output_json, binary_paths.glslang_binary
    )


def glsl_shader_job_to_amber_script(
    input_json: Path,
    output_amber: Path,
    work_dir: Path,
    binary_paths: BinaryPaths,
    amberfy_settings: AmberfySettings,
    spirv_opt_args: Optional[List[str]] = None,
) -> Path:

    result = input_json

    result = glslang_glsl_shader_job_to_spirv(
        result, work_dir / "1_spirv" / result.name, binary_paths
    )

    if spirv_opt_args:
        result = spirv_opt_shader_job(
            result,
            spirv_opt_args,
            work_dir / "1a_spirv_opt" / result.name,
            binary_paths,
        )

    result = spirv_dis_shader_job(
        result, work_dir / "2_spirv_asm" / result.name, binary_paths
    )

    result = amberfy(result, output_amber, amberfy_settings, input_json)

    return result


def glsl_shader_job_crash_to_amber_script_for_google_cts(
    input_json: Path,
    output_amber: Path,
    work_dir: Path,
    binary_paths: BinaryPaths,
    short_description: str,
    comment_text: str,
    copyright_year: str,
    extra_commands: str,
    spirv_opt_args: Optional[List[str]] = None,
) -> Path:
    """
    Converts a GLSL shader job to an Amber script suitable for adding to the CTS.

    :param input_json:
    :param output_amber:
    :param work_dir:
    :param binary_paths:
    :param short_description: One sentence, 58 characters max., no period, no line breaks.
    :param comment_text:
    :param copyright_year:
    :param extra_commands:
    :param spirv_opt_args:
    :return:
    """
    return glsl_shader_job_to_amber_script(
        input_json,
        output_amber,
        work_dir,
        binary_paths,
        AmberfySettings(
            copyright_header_text=get_copyright_header_google(copyright_year),
            add_graphics_fuzz_comment=True,
            short_description=short_description,
            comment_text=comment_text,
            use_default_fence_timeout=True,
            extra_commands=extra_commands,
            spirv_opt_args=spirv_opt_args,
            spirv_opt_hash=binary_paths.spirv_opt_hash,
        ),
        spirv_opt_args=spirv_opt_args,
    )
