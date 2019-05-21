

import pathlib
from typing import Optional, List

from .shader_job_util import shader_job_get_related_files
from .subprocess_util import run
from .util import (
    tool_on_path,
    file_mkdirs_parent,
    copy_file,
)
from .artifact_pb2 import ArtifactMetadata
from .artifacts import (
    artifact_execute_recipe_if_needed,
    Artifact,
    artifact_get_inner_file_path,
    artifact_write_metadata,
)
from .recipe_pb2 import RecipeGlslShaderJobToSpirvShaderJob


def glslang_validator_on_path() -> pathlib.Path:
    return tool_on_path('glslangValidator')


def run_glslang_glsl_shader_to_spirv_shader(
    glsl_shader_path: pathlib.Path,
    output_dir_path: pathlib.Path,
    glslang_validator_file_path: Optional[pathlib.Path] = None,
) -> pathlib.Path:

    if not glslang_validator_file_path:
        glslang_validator_file_path = glslang_validator_on_path()

    output_spirv_file_path = output_dir_path / (glsl_shader_path.name + '.spv')

    file_mkdirs_parent(output_spirv_file_path)

    run([
        str(glslang_validator_file_path),
        '-V',
        '-o',
        str(output_spirv_file_path),
        str(glsl_shader_path),
    ])

    return output_spirv_file_path


def run_glslang_glsl_to_spirv_job(
    glsl_shader_job_json_file_path: pathlib.Path,
    spirv_shader_job_json_file_path: pathlib.Path,
    glslang_validator_file_path: Optional[pathlib.Path] = None,
) -> List[pathlib.Path]:

    if not glslang_validator_file_path:
        glslang_validator_file_path = glslang_validator_on_path()

    glsl_shader_files = shader_job_get_related_files(
        glsl_shader_job_json_file_path
    )

    copy_file(glsl_shader_job_json_file_path, spirv_shader_job_json_file_path)

    output_shader_file_paths = []  # type: List[pathlib.Path]

    for glsl_shader_file in glsl_shader_files:
        spirv_file_path = run_glslang_glsl_shader_to_spirv_shader(
            glsl_shader_file,
            spirv_shader_job_json_file_path.parent,
            glslang_validator_file_path,
        )
        output_shader_file_paths.append(spirv_file_path)

    return output_shader_file_paths


def recipe_glsl_shader_job_to_spirv_shader_job(
    recipe: RecipeGlslShaderJobToSpirvShaderJob,
    output_artifact_path: str,
):
    artifact_execute_recipe_if_needed(recipe.glsl_shader_job_artifact)
    if len(recipe.glslang_validator_artifact) > 0:
        artifact_execute_recipe_if_needed(recipe.glslang_validator_artifact)

    # Inputs:  e.g. input_glsl_artifact/{x.json, x.frag, x.vert, ...}
    # Outputs: e.g. output_artifact/{x.json, x.frag.spv, x.vert.spv, ...}

    input_glsl_artifact = Artifact(recipe.glsl_shader_job_artifact)

    input_glsl_shader_job_path = artifact_get_inner_file_path(
        input_glsl_artifact.metadata.data.glsl_shader_job.shader_job_file,
        input_glsl_artifact.path,
    )

    if len(recipe.glslang_validator_artifact) > 0:
        raise NotImplementedError('Not yet implemented the use of glslang_validator_artifact')

    glslang_validator_file_path = tool_on_path('glslangValidator')

    output_metadata = ArtifactMetadata()
    output_metadata.CopyFrom(input_glsl_artifact.metadata)
    output_metadata.data.spirv_shader_job.spirv_job.shader_job_file = (
        input_glsl_artifact.metadata.data.glsl_shader_job.shader_job_file
    )
    output_metadata.data.spirv_shader_job.spirv_job.red_pixel_at_top_left = \
        input_glsl_artifact.metadata.data.glsl_shader_job.red_pixel_at_top_left
    # Derived from.
    # TODO: This could be automated.
    output_metadata.derived_from.extend(input_glsl_artifact.metadata.derived_from)
    output_metadata.derived_from.append(recipe.glsl_shader_job_artifact)
    if len(recipe.glslang_validator_artifact) > 0:
        output_metadata.derived_from.append(recipe.glslang_validator_artifact)

    output_metadata.data.spirv_shader_job.spirv_job.glsl_shader_job_source_artifact = (
        input_glsl_artifact.path
    )

    output_shader_job_file_path = artifact_get_inner_file_path(
        output_metadata.data.spirv_shader_job.spirv_job.shader_job_file,
        output_artifact_path,
    )

    run_glslang_glsl_to_spirv_job(
        input_glsl_shader_job_path,
        output_shader_job_file_path,
        glslang_validator_file_path,
    )

    artifact_write_metadata(output_metadata, output_artifact_path)
