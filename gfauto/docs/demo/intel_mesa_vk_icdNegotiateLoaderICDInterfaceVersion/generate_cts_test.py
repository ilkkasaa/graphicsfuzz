#!/usr/bin/env python3
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

import sys
from pathlib import Path

from gfauto import tool, artifact_util


def main() -> None:

    artifact_util.recipes_write_built_in()

    tool.glsl_shader_job_crash_to_amber_script_for_google_cts(
        input_json=Path() / "reduced_glsl" / "variant" / "shader.json",
        output_amber=Path() / "nested-loop-return.amber",
        work_dir=Path() / "work",
        # One sentence, 58 characters max., no period, no line breaks.
        short_description="A fragment shader with a pair of nested loops an a return",
        comment_text="""
The test passes because the fragment shader ... just writes the color red.
""",
        copyright_year="2019",
        extra_commands="""
EXPECT framebuffer IDX 0 0 SIZE 256 256 EQ_RGB 255 0 0
""",
        test_metadata_path=Path() / "reduced_glsl" / "test.json",
    )


if __name__ == "__main__":
    main()
    sys.exit(0)
