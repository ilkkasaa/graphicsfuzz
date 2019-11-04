#!/bin/sh

# Detect platform
PLATFORM="$(uname -o)"
IS_WINDOWS=false
case "$PLATFORM" in
	"GNU/Linux")
		test -n "$GENERATOR" || GENERATOR="Unix Makefiles"
	;;
	"Msys")
		test -n "$GENERATOR" || GENERATOR="Visual Studio 16 2019"
		test -n "$ARCH" || ARCH="-A x64"
	;;
	*)
		echo >&2 "Unsupported platform, exiting"
		exit 1
	;;
esac

ROOT_FOLDER=$(pwd)

test -d build || mkdir build

cd build

rm -f CMakeCache.txt && rm -rf CMakeFiles/

echo "current dir: $ROOT_FOLDER"

cmake -G "$GENERATOR" $ARCH \
	-DVULKAN_HEADERS_INSTALL_DIR="$ROOT_FOLDER/external/VulkanTools/build/Vulkan-Headers/build/install" \
	-DVULKAN_VALIDATIONLAYERS_INSTALL_DIR="$ROOT_FOLDER/external/VulkanTools/build/Vulkan-ValidationLayers/build/install" \
	-DVULKAN_TOOLS_SOURCE_DIR="$ROOT_FOLDER/external/VulkanTools" \
	-DVULKANTOOLS_SCRIPTS_DIR="$ROOT_FOLDER/external/VulkanTools/scripts" \
	-DCMAKE_INSTALL_PREFIX=install \
	..

case "$PLATFORM" in
	"GNU/Linux")
		make -j
	;;
	"Msys")
		cmake --build . --config Debug
	;;
esac