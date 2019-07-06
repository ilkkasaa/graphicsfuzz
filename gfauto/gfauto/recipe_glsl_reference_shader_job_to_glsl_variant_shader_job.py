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
from pathlib import Path
from typing import List, Optional

from gfauto import artifacts, subprocess_util, util
from gfauto.artifact_pb2 import ArtifactMetadata, ArtifactMetadataGlslShaderJob
from gfauto.recipe_pb2 import RecipeGlslReferenceShaderJobToGlslVariantShaderJob


def run_generate(
    graphicsfuzz_tool_path: Path,
    reference_shader_json: pathlib.Path,
    donors_path: pathlib.Path,
    output_shader_json: pathlib.Path,
    seed: Optional[str] = None,
    other_args: Optional[List[str]] = None,
) -> pathlib.Path:

    cmd = [
        str(graphicsfuzz_tool_path),
        "com.graphicsfuzz.generator.tool.Generate",
        str(reference_shader_json),
        str(donors_path),
        "100",  # TODO(215): remove once #215 is closed again.
        str(output_shader_json),
        "--generate-uniform-bindings",
        "--max-uniforms",
        "10",
    ]

    if seed:
        cmd.append(f"--seed={seed}")

    if other_args:
        cmd.extend(other_args)

    subprocess_util.run(cmd)

    return output_shader_json


def recipe_glsl_reference_shader_job_to_glsl_variant_shader_job(
    recipe: RecipeGlslReferenceShaderJobToGlslVariantShaderJob,
    output_artifact_path: str,
) -> None:

    artifacts.artifact_execute_recipe_if_needed(
        recipe.glsl_reference_shader_job_artifact
    )
    if recipe.graphicsfuzz_artifact:
        artifacts.artifact_execute_recipe_if_needed(recipe.graphicsfuzz_artifact)
    artifacts.artifact_execute_recipe_if_needed(recipe.glsl_donors_artifact)

    # Check fields.
    util.check_field_truthy(recipe.glsl_donors_artifact, "glsl_donors_artifact")
    util.check_field_truthy(recipe.output_shader_job_file, "output_shader_job_file")

    # Variables from recipe.
    reference_glsl_artifact_path = recipe.glsl_reference_shader_job_artifact
    reference_glsl_shader_job = artifacts.artifact_read_metadata(
        reference_glsl_artifact_path
    ).data.glsl_shader_job
    reference_json_path = artifacts.artifact_get_inner_file_path(
        reference_glsl_shader_job.shader_job_file, reference_glsl_artifact_path
    )
    donors_path = artifacts.artifact_get_inner_file_path(
        "", recipe.glsl_donors_artifact
    )
    other_args = list(recipe.other_generate_arguments)

    # Create output metadata.
    output_metadata = ArtifactMetadata(
        data=ArtifactMetadata.Data(
            glsl_shader_job=ArtifactMetadataGlslShaderJob(
                shader_job_file=recipe.output_shader_job_file,
                reference_glsl_shader_job_artifact=reference_glsl_artifact_path,
            )
        )
    )

    # Output variables.
    output_json_path = artifacts.artifact_get_inner_file_path(
        output_metadata.data.glsl_shader_job.shader_job_file, output_artifact_path
    )

    # Run GraphicsFuzz generate command.
    run_generate(
        util.tool_on_path("graphicsfuzz-tool"),
        reference_json_path,
        donors_path,
        output_json_path,
        other_args=other_args,
    )

    # Write final artifact metadata.
    artifacts.artifact_write_metadata(output_metadata, output_artifact_path)
