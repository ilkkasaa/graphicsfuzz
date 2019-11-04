#!/bin/bash

# Detect platform (and architecture in case of Windows)
PLATFORM="$(uname -o)"
case "$PLATFORM" in
    "GNU/Linux")
        test -n "$GENERATOR" || GENERATOR="Ninja"
    ;;
    "Msys")
        test -n "$GENERATOR" || GENERATOR="Visual Studio 16 2019"

        # Detect architecture
        A=$(uname -m)
        case "$A" in
            "x86_64")
                test -n "$ARCH" || ARCH="--arch x64"
            ;;
            "i386")
                test -n "$ARCH" || ARCH="--arch Win32"
            ;;
        esac
        if [ ! -n "$ARCH" ]; then
            echo >&2 "Unsupported architecture, exiting"
                exit 1
        fi
    ;;
    *)
        echo >&2 "Unsupported platform, exiting"
        exit 1
    ;;
esac

EXTERNAL_DIR="external"
# Create a directory for externals
test -d $EXTERNAL_DIR || mkdir $EXTERNAL_DIR

VulkanToolsDIR="$EXTERNAL_DIR/VulkanTools"

echo $VulkanToolsDIR
if [ ! -d "$VulkanToolsDIR" ]; then
    git clone --recurse-submodules https://github.com/LunarG/VulkanTools.git "$VulkanToolsDIR"

    # Checkout a good known version
    git -C "$VulkanToolsDIR" diff --exit-code || exit 1
    git -C "$VulkanToolsDIR" checkout sdk-1.1.121.0
fi

# Create build dir for VulkanTools and update it's external sources.

cd $VulkanToolsDIR

test -d build || mkdir build

./update_external_sources.sh

cd build


../scripts/update_deps.py $ARCH