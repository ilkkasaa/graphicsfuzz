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
import random
from typing import List, Optional

from gfauto import util, subprocess_util, shader_job_util, artifacts, built_in_binaries
from gfauto.artifact_pb2 import ArtifactMetadata
from gfauto.recipe_pb2 import RecipeSpirvShaderJobToSpirvShaderJobOpt

OPT_OPTIONS: List[str] = [
    "--ccp",
    "--combine-access-chains",
    "--convert-local-access-chains",
    "--copy-propagate-arrays",
    "--eliminate-dead-branches",
    "--eliminate-dead-code-aggressive",
    "--eliminate-dead-inserts",
    "--eliminate-local-multi-store",
    "--eliminate-local-single-block",
    "--eliminate-local-single-store",
    "--if-conversion",
    "--inline-entry-points-exhaustive",
    "--merge-blocks",
    "--merge-return",
    "--private-to-local",
    "--reduce-load-size",
    "--redundancy-elimination",
    "--scalar-replacement=100",
    "--simplify-instructions",
    "--vector-dce",
]


def random_spirv_opt_args(max_num_args: int = 30) -> List[str]:
    result: List[str] = list()
    num_args = random.randint(1, max_num_args)
    for _ in range(0, num_args):
        arg = random.choice(OPT_OPTIONS)
        # --merge-return relies on there not being unreachable code, so we always invoke dead branch
        # elimination before --merge-return.
        if arg == "--merge-return":
            result.append("--eliminate-dead-branches")
        result.append(arg)
    return result


def run_spirv_opt_on_spirv_shader(
    input_spirv_file_path: pathlib.Path,
    output_dir_path: pathlib.Path,
    spirv_opt_args: List[str],
    spirv_opt_file_path: Optional[pathlib.Path] = None,
) -> pathlib.Path:

    if not spirv_opt_file_path:
        spirv_opt_file_path = util.tool_on_path(built_in_binaries.SPIRV_OPT_NAME)

    output_spirv_file_path = output_dir_path / input_spirv_file_path.name

    util.file_mkdirs_parent(output_spirv_file_path)

    cmd = [
        str(spirv_opt_file_path),
        str(input_spirv_file_path),
        "-o",
        str(output_spirv_file_path),
        "--validate-after-all",
    ]

    cmd += spirv_opt_args

    cmd = util.prepend_catchsegv_if_available(cmd)

    subprocess_util.run(cmd)

    return output_spirv_file_path


def run_spirv_opt_on_spirv_shader_job(
    input_spirv_shader_job_json_file_path: pathlib.Path,
    output_spirv_shader_job_json_file_path: pathlib.Path,
    spirv_opt_args: List[str],
    spirv_opt_file_path: Optional[pathlib.Path] = None,
) -> pathlib.Path:

    if not spirv_opt_file_path:
        spirv_opt_file_path = util.tool_on_path(built_in_binaries.SPIRV_OPT_NAME)

    shader_files = shader_job_util.get_related_files(
        input_spirv_shader_job_json_file_path,
        language_suffix=shader_job_util.SUFFIX_SPIRV,
    )

    util.copy_file(
        input_spirv_shader_job_json_file_path, output_spirv_shader_job_json_file_path
    )

    for shader_file in shader_files:
        run_spirv_opt_on_spirv_shader(
            shader_file,
            output_spirv_shader_job_json_file_path.parent,
            spirv_opt_args,
            spirv_opt_file_path,
        )

    return output_spirv_shader_job_json_file_path


def recipe_spirv_shader_job_to_spirv_shader_job_opt(
    recipe: RecipeSpirvShaderJobToSpirvShaderJobOpt, output_artifact_path: str
) -> None:
    artifacts.artifact_execute_recipe_if_needed(recipe.spirv_shader_job_artifact)
    if recipe.spirv_opt_artifact:
        artifacts.artifact_execute_recipe_if_needed(recipe.spirv_opt_artifact)

    # Wrap input artifact for convenience.
    input_spirv_artifact = artifacts.Artifact(recipe.spirv_shader_job_artifact)

    output_metadata = ArtifactMetadata()
    output_metadata.CopyFrom(input_spirv_artifact.metadata)
    output_metadata.data.spirv_shader_job.spirv_job.spirv_opt_args.extend(
        recipe.spirv_opt_args
    )
    # Derived from.
    # TODO: This could be automated.
    output_metadata.derived_from.append(recipe.spirv_shader_job_artifact)
    if recipe.spirv_opt_artifact:
        output_metadata.derived_from.append(recipe.spirv_opt_artifact)

    # Input shader job json file comes from the input artifact metadata.
    input_shader_job_json = artifacts.artifact_get_inner_file_path(
        input_spirv_artifact.metadata.data.spirv_shader_job.spirv_job.shader_job_file,
        input_spirv_artifact.path,
    )

    # Output shader job json file is the same, but in the output artifact path.
    output_shader_job_json = artifacts.artifact_get_inner_file_path(
        input_spirv_artifact.metadata.data.spirv_shader_job.spirv_job.shader_job_file,
        output_artifact_path,
    )

    if recipe.spirv_opt_artifact:
        spirv_opt_file_path = artifacts.artifact_find_binary(
            recipe.spirv_opt_artifact, built_in_binaries.SPIRV_OPT_NAME
        )
    else:
        spirv_opt_file_path = util.tool_on_path(built_in_binaries.SPIRV_OPT_NAME)

    run_spirv_opt_on_spirv_shader_job(
        input_shader_job_json,
        output_shader_job_json,
        list(recipe.spirv_opt_args),
        spirv_opt_file_path,
    )

    artifacts.artifact_write_metadata(output_metadata, output_artifact_path)
