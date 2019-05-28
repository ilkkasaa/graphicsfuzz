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


from typing import (
    Optional,
    List,
    Iterable,
)
import pathlib

from .util import norm_path
from . import gflogging, util, proto_util
from .artifact_pb2 import ArtifactMetadata, ArtifactMetadataTextFile
from .recipe_pb2 import (
    Recipe,
    RecipeGlslShaderJobToSpirvShaderJob,
    RecipeGlslShaderJobAddRedPixels,
    RecipeSpirvAsmShaderJobToAmberScript,
    RecipeSpirvShaderJobToSpirvAsmShaderJob,
    RecipeSpirvShaderJobToSpirvShaderJobOpt,
)

artifact_metadata_file_name = 'artifact.json'
artifact_recipe_file_name = 'recipe.json'
artifact_recipe_log_file_name = 'recipe.log'
artifact_root_file_name = 'ROOT'


class Artifact:
    def __init__(self, path: str, metadata: ArtifactMetadata = None):
        self.path = path
        self.metadata = metadata
        if self.metadata is None:
            self.metadata = artifact_read_metadata(path)


class RecipeWrap:
    def __init__(self, path: str, recipe: Recipe = None):
        self.path = path
        self.recipe = recipe
        if self.recipe is None:
            self.recipe = artifact_read_recipe(path)


def artifact_path_get_root() -> pathlib.Path:
    root_file_suffix = pathlib.Path(artifact_root_file_name)
    fake_file = norm_path(pathlib.Path('fake').absolute())
    for parent in fake_file.parents:
        if (parent / root_file_suffix).exists():
            return parent
    raise FileNotFoundError('Could not find root file {}'.format(artifact_root_file_name))


def path_to_artifact_path(path: pathlib.Path) -> str:
    from_root = path.relative_to(artifact_path_get_root()).as_posix()
    return '//' + from_root


def artifact_path_absolute(artifact_path: str) -> str:
    """
    Artifact paths should almost always begin with '//', but for convenience it can be useful to
    use relative paths, especially when calling functions from an IPython shell.
    :param artifact_path: An artifact path.
    :return: absolute |artifact_path| starting with '//'.
    """
    if artifact_path.startswith('//'):
        return artifact_path
    path = norm_path(pathlib.Path(artifact_path)).absolute()
    return path_to_artifact_path(path)


def artifact_path_to_path(artifact_path: str) -> pathlib.Path:
    """
    Returns |artifact_path| converted to an OS specific path.
    Artifact paths always use '/' to separate paths.
    Artifact paths usually begin with '//' which is the artifact root directory, marked via a ROOT
    file.

    :param artifact_path: an artifact path.
    :return:
    """

    if artifact_path.startswith('//'):
        return norm_path(artifact_path_get_root() / pathlib.Path(artifact_path[2:]))

    return norm_path(pathlib.Path(artifact_path))


def artifact_get_directory_path(artifact_path: str = '') -> pathlib.Path:
    return artifact_path_to_path(artifact_path)


def artifact_get_recipe_file_path(artifact_path: str = '') -> pathlib.Path:
    return artifact_get_inner_file_path(artifact_recipe_file_name, artifact_path)


def artifact_get_metadata_file_path(artifact_path: str = '') -> pathlib.Path:
    return artifact_get_inner_file_path(artifact_metadata_file_name, artifact_path)


def artifact_get_recipe_log_file_path(artifact_path: str) -> pathlib.Path:
    return artifact_get_inner_file_path(artifact_recipe_log_file_name, artifact_path)


def artifact_write_recipe_and_execute(recipe: Recipe, artifact_path: str = ''):
    artifact_path_full = artifact_path_absolute(artifact_path)

    artifact_write_recipe(recipe, artifact_path_full)
    artifact_execute_recipe(artifact_path_full)
    return artifact_path_full


def artifact_write_recipe(recipe: Optional[Recipe] = Recipe(), artifact_path: str = ''):
    artifact_path = artifact_path_absolute(artifact_path)

    json_text = proto_util.message_to_json(recipe, including_default_value_fields=True)
    json_file_path = artifact_get_recipe_file_path(artifact_path)
    util.file_write_text(json_file_path, json_text)
    return artifact_path


def artifact_read_recipe(artifact_path: str = ''):
    recipe = Recipe()
    json_file_path = artifact_get_recipe_file_path(artifact_path)
    json_text = util.file_read_text(json_file_path)
    proto_util.json_to_message(json_text, recipe)
    return recipe


def artifact_write_metadata(
    artifact_metadata: ArtifactMetadata = ArtifactMetadata(),
    artifact_path: str = '',
):
    artifact_path = artifact_path_absolute(artifact_path)

    json_text = proto_util.message_to_json(artifact_metadata, including_default_value_fields=True)
    json_file_path = artifact_get_metadata_file_path(artifact_path)
    util.file_write_text(json_file_path, json_text)
    return artifact_path


def artifact_read_metadata(
    artifact_path: str = '',
):
    artifact_metadata = ArtifactMetadata()
    json_file_path = artifact_get_metadata_file_path(artifact_path)
    json_contents = util.file_read_text(json_file_path)
    proto_util.json_to_message(json_contents, artifact_metadata)
    return artifact_metadata


def artifact_execute_recipe_if_needed(artifact_path: str = ''):
    artifact_execute_recipe(artifact_path, only_if_artifact_json_missing=True)


def artifact_execute_recipe(artifact_path: str = '', only_if_artifact_json_missing: bool = False):

    artifact_path = artifact_path_absolute(artifact_path)

    if only_if_artifact_json_missing and artifact_get_metadata_file_path(artifact_path).exists():
        return

    recipe = artifact_read_recipe(artifact_path)

    with util.file_open_text(artifact_get_recipe_log_file_path(artifact_path), 'w') as f:
        gflogging.push_stream_for_logging(f)
        try:
            if recipe.HasField('glsl_shader_job_to_spirv_shader_job'):
                recipe_glsl_shader_job_to_spirv_shader_job(
                    recipe.glsl_shader_job_to_spirv_shader_job,
                    artifact_path,
                )
            elif recipe.HasField('spirv_shader_job_to_spirv_shader_job_opt'):
                recipe_spirv_shader_job_to_spirv_shader_job_opt(
                    recipe.spirv_shader_job_to_spirv_shader_job_opt,
                    artifact_path,
                )
            elif recipe.HasField('glsl_shader_job_add_red_pixels'):
                recipe_glsl_shader_job_add_red_pixels(
                    recipe.glsl_shader_job_add_red_pixels,
                    artifact_path,
                )
            elif recipe.HasField('spirv_shader_job_to_spirv_asm_shader_job'):
                recipe_spirv_shader_job_to_spirv_asm_shader_job(
                    recipe.spirv_shader_job_to_spirv_asm_shader_job,
                    artifact_path,
                )
            elif recipe.HasField('spirv_asm_shader_job_to_amber_script'):
                recipe_spirv_asm_shader_job_to_amber_script(
                    recipe.spirv_asm_shader_job_to_amber_script,
                    artifact_path,
                )
            else:
                raise NotImplementedError(
                    'Artifact {} has recipe type {} and this is not implemented'.format(
                        artifact_path,
                        recipe.WhichOneof('recipe'),
                    )
                )
        finally:
            gflogging.pop_stream_for_logging()


def artifact_get_inner_file_path(inner_file: str, artifact_path: str) -> pathlib.Path:
    # TODO: Consider absolute paths that we might want to support for quick hacks.
    return norm_path(artifact_get_directory_path(artifact_path) / pathlib.Path(inner_file))


# Type specific functions


def maybe_get_text_artifact_file_path(text_artifact_path: str) -> Optional[pathlib.Path]:
    result = None
    if len(text_artifact_path) > 0:
        text_artifact = Artifact(text_artifact_path)
        result = artifact_get_inner_file_path(
            text_artifact.metadata.data.text_file.text_file,
            text_artifact.path,
        )
    return result


def artifact_create_amber_script_from_glsl(
    input_artifact_path: str,
    out_artifact_prefix_path: str,
    test_name: Optional[str] = None,
    spirv_opt_args: List[str] = None,
    comment: Optional[str] = None,
):
    next_input = artifact_path_absolute(input_artifact_path)
    out_artifact_prefix_path_full = artifact_path_absolute(out_artifact_prefix_path)

    if test_name is None:
        json_file = artifact_get_inner_file_path(
            artifact_read_metadata(next_input).data.glsl_shader_job.shader_job_file,
            next_input,
        )
        test_name = json_file.stem

    next_input = artifact_write_recipe_and_execute(
        Recipe(
            glsl_shader_job_to_spirv_shader_job=RecipeGlslShaderJobToSpirvShaderJob(
                glsl_shader_job_artifact=next_input,
                glslang_validator_artifact='',
            ),
        ), out_artifact_prefix_path_full + '/glsl_spirv'
    )

    if spirv_opt_args:
        next_input = artifact_write_recipe_and_execute(
            Recipe(
                spirv_shader_job_to_spirv_shader_job_opt=RecipeSpirvShaderJobToSpirvShaderJobOpt(
                    spirv_shader_job_artifact=next_input,
                    spirv_opt_args=spirv_opt_args,
                    spirv_opt_artifact='',
                ),
            ), out_artifact_prefix_path_full + '/glsl_spirv_o')

    next_input = artifact_write_recipe_and_execute(
        Recipe(
            spirv_shader_job_to_spirv_asm_shader_job=RecipeSpirvShaderJobToSpirvAsmShaderJob(
                spirv_shader_job_artifact=next_input,
                spirv_dis_artifact='',
            ),
        ), out_artifact_prefix_path_full + '/glsl_spirv_o_asm')

    comment_artifact_path = ''
    if comment:
        comment_artifact_path = out_artifact_prefix_path_full + '/comment'
        util.file_write_text(
            artifact_get_inner_file_path('file.txt', comment_artifact_path),
            comment,
        )
        artifact_write_metadata(
            ArtifactMetadata(
                data=ArtifactMetadata.Data(
                    text_file=ArtifactMetadataTextFile(
                        text_file='file.txt',
                    )
                )
            ),
            comment_artifact_path,
        )

    artifact_write_recipe_and_execute(Recipe(
        spirv_asm_shader_job_to_amber_script=RecipeSpirvAsmShaderJobToAmberScript(
            spirv_asm_shader_job_artifact=next_input,
            make_self_contained_test=False,
            amber_script_output_file=test_name+'.amber_script',
            add_graphics_fuzz_comment=True,
            use_default_fence_timeout=False,
            add_glsl_source_as_comment=True,
            comment_text_artifact=comment_artifact_path,
        ),
    ), out_artifact_prefix_path_full + '/glsl_spirv_o_asm_amber')


def artifact_create_amber_script_from_glsl_shader_job_artifact(
    input_artifact_path: str,
    out_artifact_prefix_path: str,
    spirv_opt_args: Optional[Iterable[str]] = None,
    copyright_header_artifact_path: Optional[str] = None,
    comment: Optional[str] = None,
    make_self_contained: bool = False,
):
    next_input = input_artifact_path

    next_metadata = artifact_read_metadata(next_input)
    if (
        next_metadata.data.HasField('glsl_shader_job')
        and not next_metadata.data.glsl_shader_job.red_pixel_at_top_left
        and make_self_contained
    ):
        next_input = artifact_write_recipe(
            Recipe(
                glsl_shader_job_add_red_pixels=RecipeGlslShaderJobAddRedPixels(
                    glsl_shader_job_artifact=next_input,
                    graphics_fuzz_artifact='',
                ),
            ),
            out_artifact_prefix_path + '/glsl'
        )

    artifact_execute_recipe_if_needed(next_input)
    next_metadata = artifact_read_metadata(next_input)
    if (
        next_metadata.data.HasField('glsl_shader_job')
        and next_metadata.data.glsl_shader_job.red_pixel_at_top_left
    ):
        next_input = artifact_write_recipe(Recipe(
            glsl_shader_job_to_spirv_shader_job=RecipeGlslShaderJobToSpirvShaderJob(
                glsl_shader_job_artifact=next_input,
                glslang_validator_artifact='',
            ),
        ), out_artifact_prefix_path + '/glsl_spirv')

    if spirv_opt_args:
        artifact_execute_recipe_if_needed(next_input)
        next_metadata = artifact_read_metadata(next_input)
        if (
            next_metadata.data.HasField('spirv_shader_job')
            and len(next_metadata.data.spirv_shader_job.spirv_job.spirv_opt_args) == 0
        ):
            next_input = artifact_write_recipe(Recipe(
                spirv_shader_job_to_spirv_shader_job_opt=RecipeSpirvShaderJobToSpirvShaderJobOpt(
                    spirv_shader_job_artifact=next_input,
                    spirv_opt_args=spirv_opt_args,
                    spirv_opt_artifact='',
                ),
            ), out_artifact_prefix_path + '/glsl_spirv_o')

    artifact_execute_recipe_if_needed(next_input)
    next_metadata = artifact_read_metadata(next_input)
    if next_metadata.data.HasField('spirv_shader_job'):
        next_input = artifact_write_recipe(
            Recipe(
                spirv_shader_job_to_spirv_asm_shader_job=RecipeSpirvShaderJobToSpirvAsmShaderJob(
                    spirv_shader_job_artifact=next_input,
                    spirv_dis_artifact='',
                ),
            ), out_artifact_prefix_path + '/glsl_spirv_o_asm')

    comment_artifact_path = ''
    if comment:
        comment_artifact_path = out_artifact_prefix_path + '/comment'
        util.file_write_text(
            artifact_get_inner_file_path('file.txt', comment_artifact_path),
            comment,
        )
        artifact_write_metadata(
            ArtifactMetadata(
                data=ArtifactMetadata.Data(
                    text_file=ArtifactMetadataTextFile(
                        text_file='file.txt',
                    )
                )
            ),
            comment_artifact_path,
        )

    artifact_execute_recipe_if_needed(next_input)
    next_input = artifact_write_recipe(Recipe(
        spirv_asm_shader_job_to_amber_script=RecipeSpirvAsmShaderJobToAmberScript(
            spirv_asm_shader_job_artifact=next_input,
            make_self_contained_test=True,
            amber_script_output_file='test.amber_script',
            copyright_header_text_artifact=copyright_header_artifact_path,
            add_graphics_fuzz_comment=True,
            use_default_fence_timeout=True,
            add_glsl_source_as_comment=True,
            comment_text_artifact=comment_artifact_path,
        ),
    ), out_artifact_prefix_path + '/glsl_spirv_o_asm_amber')

    artifact_execute_recipe_if_needed(next_input)

    return next_input


from .recipe_glsl_shader_job_add_red_pixels import recipe_glsl_shader_job_add_red_pixels  # noqa
from .recipe_glsl_shader_job_to_spirv_shader_job import (  # noqa
    recipe_glsl_shader_job_to_spirv_shader_job
)
from .recipe_spirv_asm_shader_job_to_amber_script import (  # noqa
    recipe_spirv_asm_shader_job_to_amber_script
)
from .recipe_spirv_shader_job_to_spirv_asm_shader_job import (  # noqa
    recipe_spirv_shader_job_to_spirv_asm_shader_job
)
from .recipe_spirv_shader_job_to_spirv_shader_job_opt import (  # noqa
    recipe_spirv_shader_job_to_spirv_shader_job_opt
)
