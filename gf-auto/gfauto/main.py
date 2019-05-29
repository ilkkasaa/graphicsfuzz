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


def main():
    metadata = [
        {
            # 'name': 'glsl_fuzz_sample_donor_shaders',
            # 'version': 'd752efa',
            "artifact_type": {"glsl_shader_donor_set": {"glsl_version": "310 es"}},
            "rule": {
                "command_rule": {
                    "command": ["download_sample_donor_shaders", "d752efa"]
                }
            },
            "description": "Blah blah blah",
            "tags": ["aaa"],
        },
        {
            # 'name': 'glsl_fuzz_test_pair_2019',
            # 'version': 'adg234',
            "artifact_type": {"glsl_fuzz_test": {}},
            "rule": {"command_rule": {"command": [""]}},
            "input_artifact_references": [
                "glsl_fuzz_d752efa",
                "glsl_fuzz_sample_donor_shaders_abbb123",
            ],
        },
        {
            "name": "glsl_fuzz_reduction_for_pair_2019",
            "version": "adg234",
            "artifact_type": {"glsl_fuzz_reduction": {}},
            "rule": {"glsl_generate": {"command": [""]}},
            "input_artifacts": [
                {"tool": {"name": "glsl_fuzz", "version": "asd23g3f"}},
                {
                    "glsl_shader_donor_set": {
                        "name": "glsl_fuzz_samples",
                        "version": "d752efa",
                    }
                },
            ],
        },
    ]


if __name__ == "__main__":
    main()
