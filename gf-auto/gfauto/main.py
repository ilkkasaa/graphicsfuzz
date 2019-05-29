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
