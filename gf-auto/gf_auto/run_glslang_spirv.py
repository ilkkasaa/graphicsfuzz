

import pathlib
from typing import Optional, List
from shader_job_util import glsl_shader_job_get_shader_file_paths
from util import tool_on_path, copy_file, file_mkdirs_parent
from subprocess_util import run


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

    glsl_shader_files = glsl_shader_job_get_shader_file_paths(glsl_shader_job_json_file_path)

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

