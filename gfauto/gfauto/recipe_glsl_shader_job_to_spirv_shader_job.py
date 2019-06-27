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

import pathlib
from typing import Optional

from gfauto import util, subprocess_util, shader_job_util, artifacts, built_in_binaries
from gfauto.artifact_pb2 import ArtifactMetadata
from gfauto.recipe_pb2 import RecipeGlslShaderJobToSpirvShaderJob


def run_glslang_glsl_shader_to_spirv_shader(
    glsl_shader_path: pathlib.Path,
    output_dir_path: pathlib.Path,
    glslang_validator_file_path: Optional[pathlib.Path] = None,
) -> pathlib.Path:

    if not glslang_validator_file_path:
        glslang_validator_file_path = util.tool_on_path(
            built_in_binaries.GLSLANG_VALIDATOR_NAME
        )

    output_spirv_file_path = output_dir_path / (glsl_shader_path.name + ".spv")

    util.file_mkdirs_parent(output_spirv_file_path)

    subprocess_util.run(
        util.prepend_catchsegv_if_available(
            [
                str(glslang_validator_file_path),
                "-V",
                "-o",
                str(output_spirv_file_path),
                str(glsl_shader_path),
            ]
        )
    )

    return output_spirv_file_path


def run_glslang_glsl_to_spirv_job(
    glsl_shader_job_json_file_path: pathlib.Path,
    spirv_shader_job_json_file_path: pathlib.Path,
    glslang_validator_file_path: Optional[pathlib.Path] = None,
) -> pathlib.Path:

    if not glslang_validator_file_path:
        glslang_validator_file_path = util.tool_on_path(
            built_in_binaries.GLSLANG_VALIDATOR_NAME
        )

    glsl_shader_files = shader_job_util.get_related_files(
        glsl_shader_job_json_file_path
    )

    util.copy_file(glsl_shader_job_json_file_path, spirv_shader_job_json_file_path)

    for glsl_shader_file in glsl_shader_files:
        run_glslang_glsl_shader_to_spirv_shader(
            glsl_shader_file,
            spirv_shader_job_json_file_path.parent,
            glslang_validator_file_path,
        )

    return spirv_shader_job_json_file_path


def recipe_glsl_shader_job_to_spirv_shader_job(
    recipe: RecipeGlslShaderJobToSpirvShaderJob, output_artifact_path: str
) -> None:
    artifacts.artifact_execute_recipe_if_needed(recipe.glsl_shader_job_artifact)
    if recipe.glslang_validator_artifact:
        artifacts.artifact_execute_recipe_if_needed(recipe.glslang_validator_artifact)

    # Inputs:  e.g. input_glsl_artifact/{x.json, x.frag, x.vert, ...}
    # Outputs: e.g. output_artifact/{x.json, x.frag.spv, x.vert.spv, ...}

    input_glsl_artifact = artifacts.Artifact(recipe.glsl_shader_job_artifact)

    input_glsl_shader_job_path = artifacts.artifact_get_inner_file_path(
        input_glsl_artifact.metadata.data.glsl_shader_job.shader_job_file,
        input_glsl_artifact.path,
    )

    if recipe.glslang_validator_artifact:
        glslang_validator_file_path = artifacts.artifact_find_binary(
            recipe.glslang_validator_artifact, built_in_binaries.GLSLANG_VALIDATOR_NAME
        )
    else:
        glslang_validator_file_path = util.tool_on_path(
            built_in_binaries.GLSLANG_VALIDATOR_NAME
        )

    output_metadata = ArtifactMetadata()
    output_metadata.CopyFrom(input_glsl_artifact.metadata)
    output_metadata.data.spirv_shader_job.spirv_job.shader_job_file = (
        input_glsl_artifact.metadata.data.glsl_shader_job.shader_job_file
    )
    output_metadata.data.spirv_shader_job.spirv_job.red_pixel_at_top_left = (
        input_glsl_artifact.metadata.data.glsl_shader_job.red_pixel_at_top_left
    )
    # Derived from.
    # TODO: This could be automated.
    output_metadata.derived_from.extend(input_glsl_artifact.metadata.derived_from)
    output_metadata.derived_from.append(recipe.glsl_shader_job_artifact)
    if recipe.glslang_validator_artifact:
        output_metadata.derived_from.append(recipe.glslang_validator_artifact)

    output_metadata.data.spirv_shader_job.spirv_job.glsl_shader_job_source_artifact = (
        input_glsl_artifact.path
    )

    output_shader_job_file_path = artifacts.artifact_get_inner_file_path(
        output_metadata.data.spirv_shader_job.spirv_job.shader_job_file,
        output_artifact_path,
    )

    run_glslang_glsl_to_spirv_job(
        input_glsl_shader_job_path,
        output_shader_job_file_path,
        glslang_validator_file_path,
    )

    artifacts.artifact_write_metadata(output_metadata, output_artifact_path)
