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

import pathlib
from typing import List, Optional

from .artifact_pb2 import ArtifactMetadata
from .artifacts import (
    Artifact,
    artifact_execute_recipe_if_needed,
    artifact_get_inner_file_path,
    artifact_write_metadata,
)
from .recipe_pb2 import RecipeSpirvShaderJobToSpirvShaderJobOpt
from .shader_job_util import shader_job_get_related_files, spirv_suffix
from .subprocess_util import run
from .util import copy_file, file_mkdirs_parent, tool_on_path


def spirv_opt_on_path() -> pathlib.Path:
    return tool_on_path("spirv-opt")


def run_spirv_opt_on_spirv_shader(
    input_spirv_file_path: pathlib.Path,
    output_dir_path: pathlib.Path,
    spirv_opt_args: List[str],
    spirv_opt_file_path: Optional[pathlib.Path] = None,
) -> pathlib.Path:

    if not spirv_opt_file_path:
        spirv_opt_file_path = spirv_opt_on_path()

    output_spirv_file_path = output_dir_path / input_spirv_file_path.name

    file_mkdirs_parent(output_spirv_file_path)

    cmd = [
        str(spirv_opt_file_path),
        str(input_spirv_file_path),
        "-o",
        str(output_spirv_file_path),
    ]

    cmd += spirv_opt_args

    run(cmd)

    return output_spirv_file_path


def run_spirv_opt_on_spirv_shader_job(
    input_spirv_shader_job_json_file_path: pathlib.Path,
    output_spirv_shader_job_json_file_path: pathlib.Path,
    spirv_opt_args: List[str],
    spirv_opt_file_path: Optional[pathlib.Path] = None,
) -> List[pathlib.Path]:

    if not spirv_opt_file_path:
        spirv_opt_file_path = spirv_opt_on_path()

    shader_files = shader_job_get_related_files(
        input_spirv_shader_job_json_file_path, language_suffix=spirv_suffix
    )

    copy_file(
        input_spirv_shader_job_json_file_path, output_spirv_shader_job_json_file_path
    )

    output_shader_file_paths = []  # type: List[pathlib.Path]

    for shader_file in shader_files:
        spirv_file_path = run_spirv_opt_on_spirv_shader(
            shader_file,
            output_spirv_shader_job_json_file_path.parent,
            spirv_opt_args,
            spirv_opt_file_path,
        )
        output_shader_file_paths.append(spirv_file_path)

    return output_shader_file_paths


def recipe_spirv_shader_job_to_spirv_shader_job_opt(
    recipe: RecipeSpirvShaderJobToSpirvShaderJobOpt, output_artifact_path: str
):
    artifact_execute_recipe_if_needed(recipe.spirv_shader_job_artifact)
    if len(recipe.spirv_opt_artifact) > 0:
        artifact_execute_recipe_if_needed(recipe.spirv_opt_artifact)

    # Wrap input artifact for convenience.
    input_spirv_artifact = Artifact(recipe.spirv_shader_job_artifact)

    output_metadata = ArtifactMetadata()
    output_metadata.CopyFrom(input_spirv_artifact.metadata)
    output_metadata.data.spirv_shader_job.spirv_job.spirv_opt_args.extend(
        recipe.spirv_opt_args
    )
    # Derived from.
    # TODO: This could be automated.
    output_metadata.derived_from.append(recipe.spirv_shader_job_artifact)
    if len(recipe.spirv_opt_artifact) > 0:
        output_metadata.derived_from.append(recipe.spirv_opt_artifact)

    # Input shader job json file comes from the input artifact metadata.
    input_shader_job_json = artifact_get_inner_file_path(
        input_spirv_artifact.metadata.data.spirv_shader_job.spirv_job.shader_job_file,
        input_spirv_artifact.path,
    )

    # Output shader job json file is the same, but in the output artifact path.
    output_shader_job_json = artifact_get_inner_file_path(
        input_spirv_artifact.metadata.data.spirv_shader_job.spirv_job.shader_job_file,
        output_artifact_path,
    )

    if len(recipe.spirv_opt_artifact) > 0:
        raise NotImplementedError("Not yet implemented the use of spirv_opt_artifact")

    spirv_opt_file_path = tool_on_path("spirv-opt")

    run_spirv_opt_on_spirv_shader_job(
        input_shader_job_json,
        output_shader_job_json,
        list(recipe.spirv_opt_args),
        spirv_opt_file_path,
    )

    artifact_write_metadata(output_metadata, output_artifact_path)
