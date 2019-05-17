import json
import pathlib
from typing import Optional, List

import util
from shader_job_util import shader_job_get_related_files, frag_ext, asm_spirv_suffix, comp_ext, \
    all_ext, vert_ext, shader_job_get_shader_contents_or_none, glsl_suffix


AMBER_FENCE_TIMEOUT_MS = 60000


def get_text_as_comment(text: str) -> str:
    lines = text.split('\n')
    while len(lines[-1]) == 0:
        lines.pop()
    lines = [('# ' + line).rstrip() for line in lines]
    return '\n'.join(lines)


def uniform_json_to_amberscript(uniform_json_contents: str) -> str:
    """
    Returns the string representing VkScript version of uniform declarations.
    Skips the special '$compute' key, if present.

    {
      "myuniform": {
        "func": "glUniform1f",
        "args": [ 42.0 ],
        "binding": 3
      },
      "$compute": { ... will be ignored ... }
    }

    becomes:

    # myuniform
    uniform ubo 0:3 float 0 42.0

    """

    uniform_types = {
        'glUniform1i': 'int',
        'glUniform2i': 'ivec2',
        'glUniform3i': 'ivec3',
        'glUniform4i': 'ivec4',
        'glUniform1f': 'float',
        'glUniform2f': 'vec2',
        'glUniform3f': 'vec3',
        'glUniform4f': 'vec4',
    }

    descriptor_set = 0  # always 0 in our tests
    offset = 0  # We never have uniform offset in our tests

    result = ''
    j = json.loads(uniform_json_contents)
    for name, entry in j.items():

        if name == '$compute':
            continue

        func = entry['func']
        if func not in uniform_types.keys():
            raise AssertionError('Error: unknown uniform type for function: ' + func)
        uniform_type = uniform_types[func]

        result += '# ' + name + '\n'
        result += 'uniform ubo {}:{}'.format(descriptor_set, entry['binding'])
        result += ' ' + uniform_type
        result += ' {}'.format(offset)
        for arg in entry['args']:
            result += ' {}'.format(arg)
        result += '\n'

    return result


def get_amber_script_contents_from_image_shaders_contents(
    vert_asm_contents: Optional[str],
    frag_asm_contents: str,
    shader_job_json_contents: str,
    vert_glsl_contents: Optional[str] = None,
    frag_glsl_contents: Optional[str] = None,
    add_red_pixel_probe: bool = False,
    copyright_header_text: Optional[str] = None,
    add_generated_comment: bool = False,
    add_graphics_fuzz_comment: bool = False,
    comment_text: Optional[str] = None,
    use_default_fence_timeout: bool = False,
) -> str:
    """
    Generates Amberscript representation of an image test
    """

    result = ''

    if copyright_header_text:
        result += get_text_as_comment(copyright_header_text) + '\n\n'

    if add_generated_comment:
        result = '# Generated.\n\n'

    if add_graphics_fuzz_comment:
        result += '# A test for a bug found by GraphicsFuzz.\n\n'

    if comment_text:
        result += get_text_as_comment(comment_text) + '\n\n'

    if vert_glsl_contents or frag_glsl_contents:
        result += '# Derived from the following GLSL.\n\n'

    if vert_glsl_contents:
        result += '# Vertex shader GLSL:\n'
        result += get_text_as_comment(vert_glsl_contents)
        result += '\n\n'

    if frag_glsl_contents:
        result += '# Fragment shader GLSL:\n'
        result += get_text_as_comment(frag_glsl_contents)
        result += '\n\n'

    result += '[require]\n'
    result += 'fbsize 256 256\n\n'

    if not use_default_fence_timeout:
        result += '[require]\n'
        result += 'fence_timeout ' + str(AMBER_FENCE_TIMEOUT_MS) + '\n\n'

    if vert_asm_contents:
        result += '[vertex shader spirv]\n'
        result += vert_asm_contents
    else:
        result += '[vertex shader passthrough]'
    result += '\n\n'

    result += '[fragment shader spirv]\n'
    result += frag_asm_contents
    result += '\n\n'

    result += '[test]\n'
    result += '## Uniforms\n'
    result += uniform_json_to_amberscript(shader_job_json_contents)
    result += '\n'
    result += 'draw rect -1 -1 2 2\n'

    if add_red_pixel_probe:
        result += 'probe rgba (0, 0) (1, 0, 0, 1)\n'

    return result


def is_compute_job(
    input_asm_spirv_job_json_path: pathlib.Path,
) -> bool:
    comp_files = \
        shader_job_get_related_files(input_asm_spirv_job_json_path, [comp_ext], asm_spirv_suffix)
    assert len(comp_files) <= 1, 'Expected 1 or 0 compute shader files: {}'.format(comp_files)
    return len(comp_files) == 1


def run_spirv_asm_shader_job_to_amber_script(
    input_asm_spirv_job_json_path: pathlib.Path,
    output_amber_script_file_path: pathlib.Path,
    add_red_pixel_probe: bool = False,
    input_glsl_source_json_path: pathlib.Path = None,
    copyright_header_file_path: Optional[pathlib.Path] = None,
    add_generated_comment: bool = False,
    add_graphics_fuzz_comment: bool = False,
    comment_text_file_path: Optional[pathlib.Path] = None,
    use_default_fence_timeout: bool = False,
) -> None:
    if is_compute_job(input_asm_spirv_job_json_path):
        raise NotImplementedError('Converting compute shaders to AmberScript not yet implemented')
    else:
        # Get GLSL contents
        glsl_vert_contents = None
        glsl_frag_contents = None
        if input_glsl_source_json_path:
            glsl_vert_contents = shader_job_get_shader_contents_or_none(
                input_glsl_source_json_path,
                vert_ext,
            )
            glsl_frag_contents = shader_job_get_shader_contents_or_none(
                input_glsl_source_json_path,
                frag_ext,
            )

        # Get spirv asm contents
        vert_contents = shader_job_get_shader_contents_or_none(
            input_asm_spirv_job_json_path,
            vert_ext,
            asm_spirv_suffix,
        )

        frag_contents = shader_job_get_shader_contents_or_none(
            input_asm_spirv_job_json_path,
            frag_ext,
            asm_spirv_suffix,
        )

        assert frag_contents

        # Get the uniforms JSON contents.
        json_contents = util.file_read_text(input_asm_spirv_job_json_path)

        result = get_amber_script_contents_from_image_shaders_contents(
            vert_contents,
            frag_contents,
            json_contents,
            glsl_vert_contents,
            glsl_frag_contents,
            add_red_pixel_probe,
            util.file_read_text(
                copyright_header_file_path) if copyright_header_file_path is not None else None,
            add_generated_comment,
            add_graphics_fuzz_comment,
            util.file_read_text(
                comment_text_file_path) if comment_text_file_path is not None else None,
            use_default_fence_timeout,
        )

        util.file_write_text(output_amber_script_file_path, result)
