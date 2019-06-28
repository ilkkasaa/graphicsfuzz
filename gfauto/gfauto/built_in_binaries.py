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
from pathlib import Path
from typing import List, Optional, Dict, Tuple
from gfauto import artifacts
from gfauto.common_pb2 import ArchiveSet, Archive, Binary
from gfauto.recipe_pb2 import RecipeDownloadAndExtractArchiveSet, Recipe

LATEST_GRAPHICSFUZZ_ARTIFACT = "//binaries/graphicsfuzz_v1.2.1"

GLSLANG_VALIDATOR_NAME = "glslangValidator"
SPIRV_OPT_NAME = "spirv-opt"
SPIRV_VAL_NAME = "spirv-val"
SPIRV_DIS_NAME = "spirv-dis"
SWIFT_SHADER_NAME = "swift_shader_icd"

BUILT_IN_BINARY_RECIPES_PATH_PREFIX = "//binaries"

DEFAULT_BINARIES = [
    Binary(
        name="glslangValidator",
        tags=["Release"],
        version="40c16ec0b3ad03fc170f1369a58e7bbe662d82cd",
    ),
    Binary(
        name="spirv-opt",
        tags=["Release"],
        version="a2ef7be242bcacaa9127a3ce011602ec54b2c9ed",
    ),
    Binary(
        name="spirv-dis",
        tags=["Release"],
        version="a2ef7be242bcacaa9127a3ce011602ec54b2c9ed",
    ),
    Binary(
        name="spirv-val",
        tags=["Release"],
        version="a2ef7be242bcacaa9127a3ce011602ec54b2c9ed",
    ),
    Binary(
        name="swift_shader_icd",
        tags=["Debug"],
        version="a0b3a02601da8c48012a4259d335be04d00818da",
    ),
]


class BinaryManager:
    """
    _default_binaries: A list of Binary with name, version, configuration.
    _resolved_binaries:
    """

    _default_binaries: List[Binary]
    _resolved_paths: Dict[Binary, Path]
    _binary_artifacts: List[Tuple[ArchiveSet, str]]

    def __init__(
        self,
        default_binaries: List[Binary],
        platform: str,
        built_in_binaries_artifact_path_prefix: Optional[str] = None,
    ):
        self._default_binaries = default_binaries
        self._resolved_paths = {}
        self._platform = platform
        self._binary_artifacts = []

        if built_in_binaries_artifact_path_prefix:
            self._binary_artifacts = artifacts.binary_artifacts_find(
                built_in_binaries_artifact_path_prefix
            )

    def get_binary_path(self, binary: Binary) -> Path:
        result = self._resolved_paths.get(binary)
        if result:
            return result
        for (archive_set, artifact_path) in self._binary_artifacts:
            for artifact_binary in archive_set.binaries:  # type: Binary
                if artifact_binary.name != binary.name:
                    continue
                binary_tags = set(binary.tags)
                binary_tags.add(self._platform)
                recipe_binary_tags = set(artifact_binary.tags)
                if not binary_tags.issubset(recipe_binary_tags):
                    continue
                artifacts.artifact_execute_recipe_if_needed(artifact_path)
                result = artifacts.artifact_get_inner_file_path(
                    artifact_binary.path, artifact_path
                )
                self._resolved_paths[binary] = result
        if not result:
            raise AssertionError(f"Could not find binary:\n {binary}")
        return result

    def get_binary_by_name_from_list(
        self, name: str, binary_list: List[Binary]
    ) -> Binary:
        for binary in binary_list:
            if binary.name == name and self._platform in binary.tags:
                return binary

        raise AssertionError(
            f"Could not find suitable binary named {name} in list {binary_list}"
        )

    def get_binary_path_by_name(
        self,
        name: str,
        custom_binaries: Optional[List[Binary]] = None,
        device_binaries: Optional[List[Binary]] = None,
        test_binaries: Optional[List[Binary]] = None,
    ) -> Tuple[Path, str]:
        binary = self.get_binary_by_name(
            name, custom_binaries, device_binaries, test_binaries
        )
        return self.get_binary_path(binary), binary.version

    def get_binary_by_name(
        self,
        name: str,
        custom_binaries: Optional[List[Binary]] = None,
        device_binaries: Optional[List[Binary]] = None,
        test_binaries: Optional[List[Binary]] = None,
    ) -> Binary:
        binary_list = (
            (custom_binaries or [])
            + (device_binaries or [])
            + (test_binaries or [])
            + self._default_binaries
        )
        return self.get_binary_by_name_from_list(name, binary_list)


class ToolNameAndPath:
    def __init__(self, name: str, subpath: str, is_executable: bool = True):
        """
        :param name: Tool name. E.g. "glslangValidator".
        :param subpath: Tool subpath in the artifact, using "/" as the path separator. E.g. "bin/glslangValidator.exe".
        :param is_executable: True if ".exe" suffix should be added to the subpath on Windows.
        """
        self.name = name
        self.subpath = subpath
        self.is_executable = is_executable


def get_platform_from_platform_suffix(platform_suffix: str) -> str:
    platforms = ("Linux", "Mac", "Windows")
    for platform in platforms:
        if platform in platform_suffix:
            return platform
    raise AssertionError(f"Could not guess platform of {platform_suffix}")


def add_common_tags_from_platform_suffix(tags: List[str], platform_suffix: str) -> None:
    platform = get_platform_from_platform_suffix(platform_suffix)
    tags.append(platform)
    if "Release" in platform_suffix:
        tags.append("Release")
    if "Debug" in platform_suffix:
        tags.append("Debug")
    if "x64" in platform_suffix:
        tags.append("x64")


def _get_built_in_binary_recipe_from_build_github_repo(
    project_name: str,
    version_hash: str,
    build_version_hash: str,
    platform_suffixes: List[str],
    tools: List[ToolNameAndPath],
) -> List[artifacts.RecipeWrap]:

    result: List[artifacts.RecipeWrap] = []

    for platform_suffix in platform_suffixes:
        tags: List[str] = []
        add_common_tags_from_platform_suffix(tags, platform_suffix)
        binaries = [
            Binary(
                name=binary.name,
                tags=tags,
                path=(
                    (binary.subpath + ".exe") if "Windows" in tags else binary.subpath
                ),
                version=version_hash,
            )
            for binary in tools
        ]

        result.append(
            artifacts.RecipeWrap(
                f"//binaries/{project_name}_{version_hash}_{platform_suffix}",
                Recipe(
                    download_and_extract_archive_set=RecipeDownloadAndExtractArchiveSet(
                        archive_set=ArchiveSet(
                            archives=[
                                Archive(
                                    url=f"https://github.com/paulthomson/build-{project_name}/releases/download/github/paulthomson/build-{project_name}/{build_version_hash}/build-{project_name}-{build_version_hash}-{platform_suffix}.zip",
                                    output_file=f"{project_name}.zip",
                                    output_directory=project_name,
                                )
                            ],
                            binaries=binaries,
                        )
                    )
                ),
            )
        )

    return result


def _get_built_in_spirv_tools_version(
    version_hash: str, build_version_hash: str
) -> List[artifacts.RecipeWrap]:
    return _get_built_in_binary_recipe_from_build_github_repo(
        project_name="SPIRV-Tools",
        version_hash=version_hash,
        build_version_hash=build_version_hash,
        platform_suffixes=[
            "Linux_x64_Release",
            "Windows_x64_Release",
            "Mac_x64_Release",
        ],
        tools=[
            ToolNameAndPath(name="spirv-as", subpath="bin/spirv-as"),
            ToolNameAndPath(name="spirv-dis", subpath="bin/spirv-dis"),
            ToolNameAndPath(name="spirv-opt", subpath="bin/spirv-opt"),
            ToolNameAndPath(name="spirv-val", subpath="bin/spirv-val"),
        ],
    )


def _get_built_in_glslang_version(
    version_hash: str, build_version_hash: str
) -> List[artifacts.RecipeWrap]:
    return _get_built_in_binary_recipe_from_build_github_repo(
        project_name="glslang",
        version_hash=version_hash,
        build_version_hash=build_version_hash,
        platform_suffixes=[
            "Linux_x64_Release",
            "Windows_x64_Release",
            "Mac_x64_Release",
        ],
        tools=[
            ToolNameAndPath(name="glslangValidator", subpath="bin/glslangValidator")
        ],
    )


def get_graphics_fuzz_121() -> List[artifacts.RecipeWrap]:
    return [
        artifacts.RecipeWrap(
            "//binaries/graphicsfuzz_v1.2.1",
            Recipe(
                download_and_extract_archive_set=RecipeDownloadAndExtractArchiveSet(
                    archive_set=ArchiveSet(
                        archives=[
                            Archive(
                                url="https://github.com/google/graphicsfuzz/releases/download/v1.2.1/graphicsfuzz.zip",
                                output_file="graphicsfuzz.zip",
                                output_directory="graphicsfuzz",
                            )
                        ],
                        binaries=[
                            #
                            # glslangValidator
                            Binary(
                                name="glslangValidator",
                                tags=["Linux", "x64", "Release"],
                                path="graphicsfuzz/bin/Linux/glslangValidator",
                                version="40c16ec0b3ad03fc170f1369a58e7bbe662d82cd",
                            ),
                            Binary(
                                name="glslangValidator",
                                tags=["Windows", "x64", "Release"],
                                path="graphicsfuzz/bin/Windows/glslangValidator.exe",
                                version="40c16ec0b3ad03fc170f1369a58e7bbe662d82cd",
                            ),
                            Binary(
                                name="glslangValidator",
                                tags=["Mac", "x64", "Release"],
                                path="graphicsfuzz/bin/Mac/glslangValidator",
                                version="40c16ec0b3ad03fc170f1369a58e7bbe662d82cd",
                            ),
                            #
                            # spirv-opt
                            Binary(
                                name="spirv-opt",
                                tags=["Linux", "x64", "Release"],
                                path="graphicsfuzz/bin/Linux/spirv-opt",
                                version="a2ef7be242bcacaa9127a3ce011602ec54b2c9ed",
                            ),
                            Binary(
                                name="spirv-opt",
                                tags=["Windows", "x64", "Release"],
                                path="graphicsfuzz/bin/Windows/spirv-opt.exe",
                                version="a2ef7be242bcacaa9127a3ce011602ec54b2c9ed",
                            ),
                            Binary(
                                name="spirv-opt",
                                tags=["Mac", "x64", "Release"],
                                path="graphicsfuzz/bin/Mac/spirv-opt",
                                version="a2ef7be242bcacaa9127a3ce011602ec54b2c9ed",
                            ),
                            #
                            # spirv-dis
                            Binary(
                                name="spirv-dis",
                                tags=["Linux", "x64", "Release"],
                                path="graphicsfuzz/bin/Linux/spirv-dis",
                                version="a2ef7be242bcacaa9127a3ce011602ec54b2c9ed",
                            ),
                            Binary(
                                name="spirv-dis",
                                tags=["Windows", "x64", "Release"],
                                path="graphicsfuzz/bin/Windows/spirv-dis.exe",
                                version="a2ef7be242bcacaa9127a3ce011602ec54b2c9ed",
                            ),
                            Binary(
                                name="spirv-dis",
                                tags=["Mac", "x64", "Release"],
                                path="graphicsfuzz/bin/Mac/spirv-dis",
                                version="a2ef7be242bcacaa9127a3ce011602ec54b2c9ed",
                            ),
                            #
                            # spirv-as
                            Binary(
                                name="spirv-as",
                                tags=["Linux", "x64", "Release"],
                                path="graphicsfuzz/bin/Linux/spirv-as",
                                version="a2ef7be242bcacaa9127a3ce011602ec54b2c9ed",
                            ),
                            Binary(
                                name="spirv-as",
                                tags=["Windows", "x64", "Release"],
                                path="graphicsfuzz/bin/Windows/spirv-as.exe",
                                version="a2ef7be242bcacaa9127a3ce011602ec54b2c9ed",
                            ),
                            Binary(
                                name="spirv-as",
                                tags=["Mac", "x64", "Release"],
                                path="graphicsfuzz/bin/Mac/spirv-as",
                                version="a2ef7be242bcacaa9127a3ce011602ec54b2c9ed",
                            ),
                        ],
                    )
                )
            ),
        )
    ]


BUILT_IN_BINARY_RECIPES: List[artifacts.RecipeWrap] = (
    _get_built_in_spirv_tools_version(
        version_hash="4a00a80c40484a6f6f72f48c9d34943cf8f180d4",
        build_version_hash="422f2fe0f0f32494fa687a12ba343d24863b330a",
    )
    + _get_built_in_glslang_version(
        version_hash="9866ad9195cec8f266f16191fb4ec2ce4896e5c0",
        build_version_hash="1586e566f4949b1957e7c32454cbf27e501ed632",
    )
    + get_graphics_fuzz_121()
)
