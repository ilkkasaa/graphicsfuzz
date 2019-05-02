from typing import Optional

import gf_logging
import util
import proto_util
from artifact_pb2 import ArtifactMetadata
from recipe_pb2 import Recipe, RecipeGlslShaderJobToSpirvShaderJob, RecipeSpirvShaderJobOpt
import pathlib
import io

from run_spirv_opt import run_spirv_opt_on_spirv_shader_job
from util import tool_on_path
from run_glslang_spirv import run_glslang_glsl_shader_to_spirv_shader, run_glslang_glsl_to_spirv_job

artifact_metadata_file_name = 'artifact.json'
artifact_recipe_file_name = 'recipe.json'
artifact_recipe_log_file_name = 'recipe.log'


class Artifact:
    def __init__(self, path: str, metadata: ArtifactMetadata = None):
        self.path = path
        self.metadata = metadata
        if self.metadata is None:
            self.metadata = artifact_read_metadata(path)


def artifact_path_to_path(artifact_path: str) -> pathlib.Path:
    """
    Returns |artifact_path| converted to an OS specific path.
    Artifact paths always use '/'.

    :param artifact_path: a path that uses '/'. Can be an "artifact name".
    :return:
    """

    # TODO: Consider Windows.
    return pathlib.Path(artifact_path)


def artifact_get_directory_path(artifact_path: str) -> pathlib.Path:
    return artifact_path_to_path(artifact_path)


def artifact_get_recipe_file_path(artifact_path: str) -> pathlib.Path:
    return artifact_get_inner_file_path(artifact_path, artifact_recipe_file_name)


def artifact_get_metadata_file_path(artifact_path: str) -> pathlib.Path:
    return artifact_get_inner_file_path(artifact_path, artifact_metadata_file_name)


def artifact_get_recipe_log_file_path(artifact_path: str) -> pathlib.Path:
    return artifact_get_inner_file_path(artifact_path, artifact_recipe_log_file_name)


def artifact_write_recipe(artifact_path: str, recipe: Recipe = Recipe()):
    json_text = proto_util.message_to_json(recipe, including_default_value_fields=True)
    json_file_path = artifact_get_recipe_file_path(artifact_path)
    util.file_write_text(json_file_path, json_text)


def artifact_read_recipe(artifact_path: str, recipe: Optional[Recipe] = None):
    if not recipe:
        recipe = Recipe()
    json_file_path = artifact_get_recipe_file_path(artifact_path)
    json_text = util.file_read_text(json_file_path)
    proto_util.json_to_message(json_text, recipe)
    return recipe


def artifact_write_metadata(
    artifact_path: str,
    artifact_metadata: ArtifactMetadata = ArtifactMetadata()
):
    json_text = proto_util.message_to_json(artifact_metadata, including_default_value_fields=True)
    json_file_path = artifact_get_metadata_file_path(artifact_path)
    util.file_write_text(json_file_path, json_text)


def artifact_read_metadata(
    artifact_path: str,
    artifact_metadata: Optional[ArtifactMetadata] = None
):
    assert len(artifact_path) > 0
    if not artifact_metadata:
        artifact_metadata = ArtifactMetadata()
    json_file_path = artifact_get_metadata_file_path(artifact_path)
    json_contents = util.file_read_text(json_file_path)
    proto_util.json_to_message(json_contents, artifact_metadata)
    return artifact_metadata


def artifact_execute_recipe(artifact_path: str):
    recipe = artifact_read_recipe(artifact_path)
    output_metadata = ArtifactMetadata()

    with util.file_open_text(artifact_get_recipe_log_file_path(artifact_path), 'w') as f:
        gf_logging.push_stream_for_logging(f)
        try:
            if recipe.HasField('glsl_shader_job_to_spirv_shader_job'):
                recipe_glsl_shader_job_to_spirv_shader_job_run(
                    artifact_path,
                    recipe.glsl_shader_job_to_spirv_shader_job,
                )
            elif recipe.HasField('spirv_shader_job_opt'):
                recipe_spirv_shader_job_opt_run(
                    artifact_path,
                    recipe.spirv_shader_job_opt,
                )
            else:
                raise NotImplementedError(
                    'Artifact {} has recipe type {} and this is not implemented'.format(
                        artifact_path,
                        recipe.WhichOneof('recipe'),
                    )
                )
        finally:
            gf_logging.pop_stream_for_logging()



def artifact_get_inner_file_path(artifact_path: str, inner_file: str) -> pathlib.Path:
    # TODO: Consider Windows.
    # TODO: Consider absolute paths that we might want to support for quick hacks.
    return artifact_get_directory_path(artifact_path) / pathlib.Path(inner_file)


# Type specific functions


def artifact_create_recipe_glslang_spv(artifact: str):
    recipe = Recipe()
    recipe.glsl_shader_job_to_spirv_shader_job.SetInParent()
    artifact_write_recipe(artifact, recipe)


def recipe_glsl_shader_job_to_spirv_shader_job_run(
    output_artifact_path: str,
    recipe: RecipeGlslShaderJobToSpirvShaderJob,
):
    # Inputs:  e.g. input_glsl_artifact/{x.json, x.frag, x.vert, ...}
    # Outputs: e.g. output_artifact/{x.json, x.frag.spv, x.vert.spv, ...}

    input_glsl_artifact_path = recipe.glsl_shader_job_artifact
    input_glsl_artifact_metadata = artifact_read_metadata(input_glsl_artifact_path)
    input_glsl_shader_job_path = artifact_get_inner_file_path(
        input_glsl_artifact_path,
        input_glsl_artifact_metadata.data.glsl_shader_job.shader_job_file
    )

    if len(recipe.glslang_validator_artifact) > 0:
        raise NotImplementedError('Not yet implemented the use of glslang_validator_artifact')

    glslang_validator_file_path = tool_on_path('glslangValidator')

    output_metadata = ArtifactMetadata()
    output_metadata.data.spirv_shader_job.shader_job_file = (
        input_glsl_artifact_metadata.data.glsl_shader_job.shader_job_file
    )
    # Derived from.
    # TODO: This could be automated.
    output_metadata.derived_from.extend(input_glsl_artifact_metadata.derived_from)
    output_metadata.derived_from.append(recipe.glsl_shader_job_artifact)
    if len(recipe.glslang_validator_artifact) > 0:
        output_metadata.derived_from.append(recipe.glslang_validator_artifact)

    output_metadata.data.spirv_shader_job.glsl_shader_job_source_artifact = input_glsl_artifact_path

    output_shader_job_file_path = artifact_get_inner_file_path(
        output_artifact_path,
        output_metadata.data.spirv_shader_job.shader_job_file
    )

    run_glslang_glsl_to_spirv_job(
        input_glsl_shader_job_path,
        output_shader_job_file_path,
        glslang_validator_file_path,
    )

    artifact_write_metadata(output_artifact_path, output_metadata)


def recipe_spirv_shader_job_opt_run(
    output_artifact_path: str,
    recipe: RecipeSpirvShaderJobOpt,
):
    # Wrap input artifact for convenience.
    input_spirv_artifact = Artifact(recipe.spirv_shader_job_artifact)

    # Output metadata is the same as the input metadata, with minor changes.
    output_metadata = ArtifactMetadata()
    output_metadata.CopyFrom(input_spirv_artifact.metadata)
    output_metadata.data.spirv_shader_job.optimized = True
    # Derived from.
    # TODO: This could be automated.
    output_metadata.derived_from.append(recipe.spirv_shader_job_artifact)
    if len(recipe.spirv_opt_artifact) > 0:
        output_metadata.derived_from.append(recipe.spirv_opt_artifact)

    # Input shader job json file comes from the input artifact metadata.
    input_shader_job_json = artifact_get_inner_file_path(
        input_spirv_artifact.path,
        input_spirv_artifact.metadata.data.spirv_shader_job.shader_job_file,
    )

    # Output shader job json file is the same, but in the output artifact path.
    output_shader_job_json = artifact_get_inner_file_path(
        output_artifact_path,
        input_spirv_artifact.metadata.data.spirv_shader_job.shader_job_file,
    )

    if len(recipe.spirv_opt_artifact) > 0:
        raise NotImplementedError('Not yet implemented the use of spirv_opt_artifact')

    spirv_opt_file_path = tool_on_path('spirv-opt')

    run_spirv_opt_on_spirv_shader_job(
        input_shader_job_json,
        output_shader_job_json,
        list(recipe.spirv_opt_args),
        spirv_opt_file_path,
    )

    artifact_write_metadata(output_artifact_path, output_metadata)
