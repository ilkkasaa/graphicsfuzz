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

import os
import pathlib
import platform
import shutil
from contextlib import contextmanager
from typing import Any, BinaryIO, Iterator, List, TextIO, cast

# Note: Could use the built-in |file.open| and |file.write_text|, etc.


def file_open_binary(file: pathlib.Path, mode: str) -> BinaryIO:  # noqa VNE002
    check(mode.find("b") != -1, AssertionError(f"|mode|(=={mode}) should contain 'b'"))
    # Type hint (no runtime check).
    result = cast(BinaryIO, open(str(file), mode))
    return result


def file_open_text(file: pathlib.Path, mode: str) -> TextIO:  # noqa VNE002
    check(
        mode.find("b") == -1, AssertionError(f"|mode|(=={mode}) should not contain 'b'")
    )
    # Type hint (no runtime check).
    result = cast(TextIO, open(str(file), mode, encoding="utf-8", errors="ignore"))
    return result


def file_read_text(file: pathlib.Path) -> str:  # noqa VNE002
    with file_open_text(file, "r") as f:
        return f.read()


def file_read_lines(file: pathlib.Path) -> List[str]:  # noqa VNE002
    with file_open_text(file, "r") as f:
        return f.readlines()


def file_write_text(file: pathlib.Path, text: str) -> int:  # noqa VNE002
    file_mkdirs_parent(file)
    with file_open_text(file, "w") as f:
        return f.write(text)


def mkdirs_p(path: pathlib.Path) -> None:  # noqa VNE002
    path.mkdir(parents=True, exist_ok=True)


def file_mkdirs_parent(file: pathlib.Path) -> None:  # noqa VNE002
    mkdirs_p(file.parent)


class ToolNotOnPathError(Exception):
    pass


def tool_on_path(tool: str) -> pathlib.Path:  # noqa VNE002
    result = shutil.which(tool)
    if result is None:
        raise ToolNotOnPathError(
            "Could not find {} on PATH. Please add to PATH.".format(tool)
        )
    return pathlib.Path(result)


def spirv_dis_on_path() -> pathlib.Path:
    return tool_on_path("spirv-dis")


def copy_file(source_file_path: pathlib.Path, dest_file_path: pathlib.Path) -> None:
    file_mkdirs_parent(dest_file_path)
    shutil.copy(str(source_file_path), str(dest_file_path))


def remove_end(str_in: str, str_end: str) -> str:
    check(
        str_in.endswith(str_end),
        AssertionError(f"|str_in|(=={str_in}) should end with |str_end|(=={str_end})"),
    )
    return str_in[: -len(str_end)]


def norm_path(path: pathlib.Path) -> pathlib.Path:  # noqa VNE002
    return pathlib.Path(os.path.normpath(str(path)))


@contextmanager
def pushd(path: pathlib.Path) -> Iterator[None]:  # noqa VNE002
    current_dir = pathlib.Path().resolve()
    os.chdir(str(path))
    try:
        yield
    finally:
        os.chdir(str(current_dir))


def check(condition: bool, exception: Exception) -> None:
    if not condition:
        raise exception


def check_field_truthy(field: Any, field_name: str) -> None:
    if not field:
        raise ValueError(f"{field_name}(={str(field)}) must be filled")


def get_platform() -> str:
    host = platform.system()
    if host in ("Linux", "Windows"):
        return host
    if host == "Darwin":
        return "Mac"
    raise AssertionError("Unsupported platform: {}".format(host))
