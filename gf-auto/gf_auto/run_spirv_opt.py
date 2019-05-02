

import pathlib
from typing import Optional, List
from shader_job_util import glsl_shader_job_get_shader_file_paths, \
    spirv_shader_job_get_shader_file_paths
from util import tool_on_path, copy_file, file_mkdirs_parent
from subprocess_util import run


def spirv_opt_on_path() -> pathlib.Path:
    return tool_on_path('spirv-opt')


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
        '-o',
        str(output_spirv_file_path)
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

    shader_files = spirv_shader_job_get_shader_file_paths(
        input_spirv_shader_job_json_file_path
    )

    copy_file(
        input_spirv_shader_job_json_file_path,
        output_spirv_shader_job_json_file_path,
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

