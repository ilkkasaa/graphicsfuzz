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
from typing import Iterable, Optional

from . import util

frag_ext = ".frag"
vert_ext = ".vert"
comp_ext = ".comp"

all_ext = (frag_ext, vert_ext, comp_ext)

glsl_suffix = ""
spirv_suffix = ".spv"
asm_spirv_suffix = ".asm"


glsl_shader_job_related_file_extensions = [".frag", ".vert", ".comp"]
spirv_shader_job_related_file_extensions = [".frag.spv", ".vert.spv", ".comp.spv"]
asm_spirv_shader_job_related_file_extensions = [".frag.asm", ".vert.asm", ".comp.asm"]


def shader_job_get_shader_contents(
    shader_job_file_path: pathlib.Path,
    extension: str,
    language_suffix: str = glsl_suffix,
    must_exist: bool = False,
) -> Optional[str]:
    shader_file = shader_job_file_path.with_suffix(extension + language_suffix)
    if shader_file.exists():
        return util.file_read_text(shader_file)
    if must_exist:
        raise AssertionError(f"could not read {shader_file}")

    return None


# Get related files.


def shader_job_get_related_files(
    shader_job_file_path: pathlib.Path,
    extensions: Iterable[str] = all_ext,
    language_suffix: str = glsl_suffix,
):
    # .frag, .comp, ...
    files = extensions

    # .frag.spv, .comp.spv
    files = [(f + language_suffix) for f in files]

    # variant_001.frag.spv, variant_001.comp.spv (does not exist), ...
    paths = [shader_job_file_path.with_suffix(f) for f in files]

    # variant_001.frag.spv, ...
    paths = [p for p in paths if p.exists()]
    return paths


# Copy files.


def shader_job_copy(
    shader_job_file_path: pathlib.Path,
    output_shader_job_file_path: pathlib.Path,
    extensions: Iterable[str] = all_ext,
    language_suffix: str = glsl_suffix,
):
    output_files = [output_shader_job_file_path]

    util.copy_file(shader_job_file_path, output_shader_job_file_path)

    # = [source/variant.frag, source/variant.vert, ...]
    other_files = shader_job_get_related_files(
        shader_job_file_path, extensions, language_suffix
    )

    # = [variant.frag, variant.vert, ...]
    dest_other_files = [f.name for f in other_files]

    # = [dest/variant.frag, dest/variant.vert, ...]
    dest_other_files = [
        output_shader_job_file_path.with_name(f) for f in dest_other_files
    ]

    for (source, dest) in zip(other_files, dest_other_files):
        util.copy_file(source, dest)
        output_files.append(dest)

    return output_files
