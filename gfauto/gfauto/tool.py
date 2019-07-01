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

import attr

from gfauto import (
    shader_job_util,
    subprocess_util,
    util,
    built_in_binaries,
    artifacts,
    recipe_spirv_asm_shader_job_to_amber_script,
    recipe_spirv_shader_job_to_spirv_asm_shader_job,
    recipe_spirv_shader_job_to_spirv_shader_job_opt,
    recipe_glsl_shader_job_to_spirv_shader_job,
)
from gfauto.util import check

AMBER_COMMAND_PROBE_TOP_LEFT_RED = "probe rgba (0, 0) (1, 0, 0, 1)\n"


class PathAndVersion:
    def __init__(self, path: Optional[Path] = None, version: Optional[str] = None):
        self.path = path
        self.version = version


BINARY_NAME_KEY = "binary_name"

# The following is similar to a Python "dataclass".
# The first few members are fields, with a default value and some metadata.
# The constructor is generated automatically.


@attr.s
class BinaryPaths:
    glslang_binary: Optional[Path] = None
    spirv_opt_binary: Optional[Path] = None
    spirv_opt_no_validate_after_all: bool = False
    spirv_dis_binary: Optional[Path] = None
    spirv_val_binary: Optional[Path] = None
    swift_shader_icd: Optional[Path] = None


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


def get_binary_paths_using_artifact_system(artifact_path: str) -> BinaryPaths:
    artifacts.recipes_write_built_in()
    artifacts.artifact_execute_recipe_if_needed(artifact_path)
    binary_paths = BinaryPaths()

    binary_paths.glslang_binary, _ = artifacts.artifact_find_binary(
        artifact_path, built_in_binaries.GLSLANG_VALIDATOR_NAME
    )
    binary_paths.spirv_opt_binary, spirv_opt_binary_info = artifacts.artifact_find_binary(
        artifact_path, built_in_binaries.SPIRV_OPT_NAME
    )
    if (
        built_in_binaries.SPIRV_OPT_NO_VALIDATE_AFTER_ALL_TAG
        in spirv_opt_binary_info.tags
    ):
        binary_paths.spirv_opt_no_validate_after_all = True
    binary_paths.spirv_dis_binary, _ = artifacts.artifact_find_binary(
        artifact_path, built_in_binaries.SPIRV_DIS_NAME
    )
    binary_paths.spirv_val_binary, _ = artifacts.artifact_find_binary(
        artifact_path, built_in_binaries.SPIRV_VAL_NAME
    )
    return binary_paths


def amberfy(
    input_json: Path,
    output_amber: Path,
    amberfy_settings: recipe_spirv_asm_shader_job_to_amber_script.AmberfySettings,
    input_glsl_source_json_path: Optional[Path] = None,
) -> Path:
    return recipe_spirv_asm_shader_job_to_amber_script.run_spirv_asm_shader_job_to_amber_script(
        input_json, output_amber, amberfy_settings, input_glsl_source_json_path
    )


def spirv_dis_shader_job(
    input_json: Path, output_json: Path, binary_paths: BinaryPaths
) -> Path:
    return recipe_spirv_shader_job_to_spirv_asm_shader_job.run_spirv_shader_job_to_spirv_asm_shader_job(
        input_json, output_json, binary_paths.spirv_dis_binary
    )


def spirv_opt_shader_job(
    input_json: Path,
    spirv_opt_args: List[str],
    output_json: Path,
    binary_paths: BinaryPaths,
) -> Path:
    return recipe_spirv_shader_job_to_spirv_shader_job_opt.run_spirv_opt_on_spirv_shader_job(
        input_json,
        output_json,
        spirv_opt_args,
        binary_paths.spirv_opt_binary,
        binary_paths.spirv_opt_no_validate_after_all,
    )


def glslang_glsl_shader_job_to_spirv(
    input_json: Path, output_json: Path, binary_paths: BinaryPaths
) -> Path:
    return recipe_glsl_shader_job_to_spirv_shader_job.run_glslang_glsl_to_spirv_job(
        input_json, output_json, binary_paths.glslang_binary
    )


def run_spirv_val_on_shader(shader_path: Path, spirv_val_path: Path) -> None:
    subprocess_util.run(
        util.prepend_catchsegv_if_available([str(spirv_val_path), str(shader_path)])
    )


def validate_spirv_shader_job_helper(input_json: Path, spirv_val_path: Path) -> None:
    shader_paths = shader_job_util.get_related_files(
        input_json, shader_job_util.EXT_ALL, shader_job_util.SUFFIX_SPIRV
    )
    for shader_path in shader_paths:
        run_spirv_val_on_shader(shader_path, spirv_val_path)


def validate_spirv_shader_job(input_json: Path, binary_paths: BinaryPaths) -> None:
    check(bool(binary_paths.spirv_val_binary), AssertionError("Need spirv-val path"))
    assert binary_paths.spirv_val_binary  # noqa, keeps the type checker happy.

    validate_spirv_shader_job_helper(input_json, binary_paths.spirv_val_binary)


def glsl_shader_job_to_amber_script(
    input_json: Path,
    output_amber: Path,
    work_dir: Path,
    binary_paths: BinaryPaths,
    amberfy_settings: recipe_spirv_asm_shader_job_to_amber_script.AmberfySettings,
    spirv_opt_args: Optional[List[str]] = None,
) -> Path:

    result = input_json

    result = glslang_glsl_shader_job_to_spirv(
        result, work_dir / "1_spirv" / result.name, binary_paths
    )

    validate_spirv_shader_job(result, binary_paths)

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
    spirv_opt_hash: Optional[str] = None,
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
    :param spirv_opt_hash:
    :return:
    """
    return glsl_shader_job_to_amber_script(
        input_json,
        output_amber,
        work_dir,
        binary_paths,
        recipe_spirv_asm_shader_job_to_amber_script.AmberfySettings(
            copyright_header_text=get_copyright_header_google(copyright_year),
            add_graphics_fuzz_comment=True,
            short_description=short_description,
            comment_text=comment_text,
            use_default_fence_timeout=True,
            extra_commands=extra_commands,
            spirv_opt_args=spirv_opt_args,
            spirv_opt_hash=spirv_opt_hash,
        ),
        spirv_opt_args=spirv_opt_args,
    )
