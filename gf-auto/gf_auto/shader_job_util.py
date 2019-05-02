

import io
import pathlib
import shutil
from typing import List


glsl_shader_job_related_file_extensions = ['.frag', '.vert', '.comp']
spirv_shader_job_related_file_extensions = ['.frag.spv', '.vert.spv', '.comp.spv']


def glsl_shader_job_get_shader_file_paths(
    shader_job_file_path: pathlib.Path
) -> List[pathlib.Path]:

    # .frag, .comp, ...
    files = glsl_shader_job_related_file_extensions

    # variant_001.frag, variant_001.comp (does not exist), ...
    files = [shader_job_file_path.with_suffix(f) for f in files]

    # variant_001.frag, ...
    files = [f for f in files if f.exists()]
    return files


def spirv_shader_job_get_shader_file_paths(
    shader_job_file_path: pathlib.Path
) -> List[pathlib.Path]:

    # .frag.spv, .comp.spv ...
    files = spirv_shader_job_related_file_extensions

    # variant_001.frag.spv, variant_001.comp.spv (does not exist), ...
    files = [shader_job_file_path.with_suffix(f) for f in files]

    # variant_001.frag.spv, ...
    files = [f for f in files if f.exists()]
    return files

