

import io
import pathlib
import shutil

# Note: Could use the built-in |file.open| and |file.write_text|, etc.
from typing import Optional


def file_open_binary(file: pathlib.Path, mode: str):
    assert mode.find('b') != -1
    return io.open(str(file), mode)


def file_open_text(file: pathlib.Path, mode: str):
    assert mode.find('b') == -1
    return io.open(str(file), mode, encoding='utf-8', errors='ignore')


def file_read_text(file: pathlib.Path):
    with file_open_text(file, 'r') as f:
        return f.read()


def file_read_lines(file: pathlib.Path):
    with file_open_text(file, 'r') as f:
        return f.readline()


def file_write_text(file: pathlib.Path, text: str):
    file_mkdirs_parent(file)
    with file_open_text(file, 'w') as f:
        return f.write(text)


def mkdirs_p(dir: pathlib.Path):
    dir.mkdir(parents=True, exist_ok=True)


def file_mkdirs_parent(file: pathlib.Path):
    mkdirs_p(file.parent)


class ToolNotOnPathError(Exception):
    pass


def tool_on_path(tool: str) -> pathlib.Path:
    result = shutil.which(tool)
    if result is None:
        raise ToolNotOnPathError('Could not find {} on PATH. Please add to PATH.'.format(tool))
    return pathlib.Path(result)


def spirv_dis_on_path() -> pathlib.Path:
    return tool_on_path('spirv-dis')


def copy_file(
    source_file_path: pathlib.Path,
    dest_file_path: pathlib.Path,
):
    file_mkdirs_parent(dest_file_path)
    shutil.copy(str(source_file_path), str(dest_file_path))


def remove_end(str_in: str, str_end: str):
    assert str_in.endswith(str_end), 'Expected {} to end with {}'.format(str_in, str_end)
    return str_in[:-len(str_end)]
