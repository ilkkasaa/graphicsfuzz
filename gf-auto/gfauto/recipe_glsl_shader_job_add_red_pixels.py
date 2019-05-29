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
from typing import Optional, List
import re

from .artifact_pb2 import ArtifactMetadata
from .recipe_pb2 import RecipeGlslShaderJobAddRedPixels
from . import util
from .shader_job_util import shader_job_copy
from .artifacts import (
    artifact_execute_recipe_if_needed,
    Artifact,
    artifact_get_inner_file_path,
    artifact_write_metadata,
)

#                      | group 1       ||g2|
pattern = re.compile(r"(void main\(\)\n)({)")


class AddRedPixelError(Exception):
    pass


def add_red_pixel_code_to_frag_file(frag_file: pathlib.Path):
    frag_contents = util.file_read_text(frag_file)

    # Replace opening brace of main with the following.
    (frag_contents, n) = pattern.subn(
        r"""\1{
 if (gl_FragCoord.x < 10.0)
  {
   _GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
   return;
  }""",
        frag_contents,
    )

    if n != 1:
        raise AddRedPixelError(
            "Failed to add red pixel code using regex in {}".format(str(frag_file))
        )

    util.file_write_text(frag_file, frag_contents)


def run_glsl_shader_job_add_red_pixels(
    input_shader_job_json_file_path: pathlib.Path,
    output_shader_job_json_file_path: pathlib.Path,
    graphics_fuzz_tool_path: Optional[pathlib.Path] = None,
) -> List[pathlib.Path]:

    if graphics_fuzz_tool_path:
        raise NotImplementedError(
            "Not yet implemented used of GraphicsFuzz to add red pixels to a shader"
        )

    output_files = shader_job_copy(
        input_shader_job_json_file_path, output_shader_job_json_file_path
    )

    frag_files = [f for f in output_files if f.name.endswith(".frag")]

    if len(frag_files) != 1:
        raise FileNotFoundError(
            "Could not find single .frag file; found: {}".format(frag_files)
        )

    frag_file = frag_files[0]

    add_red_pixel_code_to_frag_file(frag_file)

    return output_files


def recipe_glsl_shader_job_add_red_pixels(
    recipe: RecipeGlslShaderJobAddRedPixels, output_artifact_path: str
):
    artifact_execute_recipe_if_needed(recipe.glsl_shader_job_artifact)
    if len(recipe.graphics_fuzz_artifact) > 0:
        artifact_execute_recipe_if_needed(recipe.graphics_fuzz_artifact)

    # Wrap input artifact for convenience.
    input_glsl_artifact = Artifact(recipe.glsl_shader_job_artifact)

    output_metadata = ArtifactMetadata()
    output_metadata.CopyFrom(input_glsl_artifact.metadata)
    output_metadata.data.glsl_shader_job.red_pixel_at_top_left = True
    output_metadata.derived_from.append(recipe.glsl_shader_job_artifact)
    if len(recipe.graphics_fuzz_artifact) > 0:
        output_metadata.derived_from.append(recipe.graphics_fuzz_artifact)

    input_json_path = artifact_get_inner_file_path(
        input_glsl_artifact.metadata.data.glsl_shader_job.shader_job_file,
        input_glsl_artifact.path,
    )

    output_json_path = artifact_get_inner_file_path(
        output_metadata.data.glsl_shader_job.shader_job_file, output_artifact_path
    )

    run_glsl_shader_job_add_red_pixels(input_json_path, output_json_path)

    artifact_write_metadata(output_metadata, output_artifact_path)
