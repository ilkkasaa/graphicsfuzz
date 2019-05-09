

import pathlib
from typing import Optional, List
import util
from shader_job_util import shader_job_get_related_files, spirv_suffix
from subprocess_util import run


def run_spirv_dis_on_spirv_shader(
    input_spirv_file_path: pathlib.Path,
    output_dir_path: pathlib.Path,
    spirv_dis_file_path: Optional[pathlib.Path] = None,

) -> pathlib.Path:
    if not spirv_dis_file_path:
        spirv_dis_file_path = util.spirv_dis_on_path()

    output_spirv_file_path = output_dir_path / (
        util.remove_end(input_spirv_file_path.name, '.spv') + '.asm'
    )

    util.file_mkdirs_parent(output_spirv_file_path)

    run([
        str(spirv_dis_file_path),
        str(input_spirv_file_path),
        '-o',
        str(output_spirv_file_path),
        '--raw-id',
    ])

    return output_spirv_file_path


def run_spirv_shader_job_to_spirv_asm_shader_job(
    input_spirv_job_json_file_path: pathlib.Path,
    output_spirv_job_json_file_path: pathlib.Path,
    spirv_dis_file_path: Optional[pathlib.Path] = None,
) -> List[pathlib.Path]:

    if not spirv_dis_file_path:
        spirv_dis_file_path = util.spirv_dis_on_path()

    shader_files = shader_job_get_related_files(
        input_spirv_job_json_file_path,
        language_suffix=spirv_suffix,
    )

    util.copy_file(
        input_spirv_job_json_file_path,
        output_spirv_job_json_file_path,
    )

    output_shader_file_paths = []  # type: List[pathlib.Path]

    for shader_file in shader_files:
        asm_file_path = run_spirv_dis_on_spirv_shader(
            shader_file,
            output_spirv_job_json_file_path.parent,
            spirv_dis_file_path,
        )
        output_shader_file_paths.append(asm_file_path)

    return output_shader_file_paths




