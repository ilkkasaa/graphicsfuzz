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
import shutil
import subprocess
import time
from pathlib import Path
from typing import List, Optional

from gfauto import gflogging
from gfauto.gflogging import log
from gfauto.util import check, file_open_text, file_write_text

from .subprocess_util import run
from .util import tool_on_path

ANDROID_DEVICE_DIR = "/data/local/tmp"
ANDROID_AMBER_NDK = "amber_ndk"
ANDROID_DEVICE_AMBER = ANDROID_DEVICE_DIR + "/" + ANDROID_AMBER_NDK

ANDROID_DEVICE_GRAPHICSFUZZ_DIR = ANDROID_DEVICE_DIR + "/graphicsfuzz"
ANDROID_DEVICE_RESULT_DIR = ANDROID_DEVICE_GRAPHICSFUZZ_DIR + "/result"
ANDROID_DEVICE_AMBER_SCRIPT_FILE = ANDROID_DEVICE_GRAPHICSFUZZ_DIR + "/test.amber"
IMAGE_FILE = "image.png"
BUFFER_FILE = "buffer.bin"

TIMEOUT_RUN = 30

BUSY_WAIT_SLEEP_SLOW = 1.0


def adb_path():
    if "ANDROID_HOME" in os.environ:
        platform_tools_path = Path(os.environ["ANDROID_HOME"]) / "platform-tools"
        adb = shutil.which("adb", path=str(platform_tools_path))
        if adb:
            return adb
    return tool_on_path("adb")


def adb_helper(
    serial: Optional[str],
    adb_args: List[str],
    check_exit_code: bool,
    verbose: bool = False,
) -> subprocess.CompletedProcess:

    adb_cmd = [adb_path()]
    if serial:
        adb_cmd.append("-s")
        adb_cmd.append(serial)

    adb_cmd.extend(adb_args)

    return run(
        adb_cmd, check_exit_code=check_exit_code, timeout=TIMEOUT_RUN, verbose=verbose
    )


def adb_check(
    serial: Optional[str], adb_args: List[str], verbose: bool = False
) -> subprocess.CompletedProcess:

    return adb_helper(serial, adb_args, check_exit_code=True, verbose=verbose)


def adb_can_fail(
    serial: Optional[str], adb_args: List[str], verbose: bool = False
) -> subprocess.CompletedProcess:

    return adb_helper(serial, adb_args, check_exit_code=False, verbose=verbose)


def stay_awake_warning(serial: Optional[str] = None):
    res = adb_check(serial, ["shell", "settings get global stay_on_while_plugged_in"])
    if str(res.stdout).strip() == "0":
        log('\nWARNING: please enable "Stay Awake" from developer settings\n')


def is_screen_off_or_locked(serial: Optional[str] = None):
    """
    :return: True: the screen is off or locked. False: unknown.
    """
    res = adb_can_fail(serial, ["shell", "dumpsys nfc"])
    if res.returncode != 0:
        return False

    stdout = str(res.stdout)
    # You will often find "mScreenState=OFF_LOCKED", but this catches OFF too, which is good.
    if stdout.find("mScreenState=OFF") >= 0:
        return True
    if stdout.find("mScreenState=ON_LOCKED") >= 0:
        return True

    return False


def prepare_device(wait_for_screen: bool, serial: Optional[str] = None) -> None:
    res = adb_can_fail(serial, ["shell", "test -e " + ANDROID_DEVICE_AMBER])
    check(
        res.returncode == 0,
        AssertionError("Failed to find amber on device at: " + ANDROID_DEVICE_AMBER),
    )

    adb_check(
        serial,
        [
            "shell",
            # One string:
            # Remove graphicsfuzz directory.
            f"rm -rf {ANDROID_DEVICE_GRAPHICSFUZZ_DIR} && "
            # Make result directory.
            f"mkdir -p {ANDROID_DEVICE_RESULT_DIR}",
        ],
    )

    if wait_for_screen:
        stay_awake_warning(serial)
        # We cannot reliably know if the screen is on, but this function definitely knows if it is
        # off or locked. So we wait here while we definitely know there is an issue.
        while is_screen_off_or_locked():
            log(
                "\nWARNING: The screen appears to be off or locked. Please unlock the device and ensure 'Stay Awake' is enabled in developer settings.\n"
            )
            time.sleep(BUSY_WAIT_SLEEP_SLOW)


def run_amber_on_device(
    amber_script_file: Path,
    output_dir: Path,
    dump_image: bool,
    dump_buffer: bool,
    skip_render: bool = False,
    serial: str = None,
) -> Path:

    with file_open_text(output_dir / "amber_log.txt", "w") as log_file:
        try:
            gflogging.push_stream_for_logging(log_file)

            run_amber_on_device_helper(
                amber_script_file,
                output_dir,
                dump_image,
                dump_buffer,
                skip_render,
                serial,
            )
        finally:
            gflogging.pop_stream_for_logging()

    return output_dir


def run_amber_on_device_helper(
    amber_script_file: Path,
    output_dir: Path,
    dump_image: bool,
    dump_buffer: bool,
    skip_render: bool = False,
    serial: str = None,
) -> Path:
    prepare_device(wait_for_screen=True, serial=serial)

    adb_check(serial, ["push", amber_script_file, ANDROID_DEVICE_AMBER_SCRIPT_FILE])

    amber_flags = "--log-graphics-calls-time --log-execute-calls"
    if skip_render:
        # -ps tells amber to stop after pipeline creation
        amber_flags += " -ps"
    else:
        if dump_image:
            amber_flags += f" -i {IMAGE_FILE}"
        if dump_buffer:
            amber_flags += f" -b {BUFFER_FILE} -B 0"

    cmd = [
        "shell",
        # The following is a single string:
        f"cd {ANDROID_DEVICE_RESULT_DIR} && "
        # -d disables Vulkan validation layers.
        f"{ANDROID_DEVICE_AMBER} -d {ANDROID_DEVICE_AMBER_SCRIPT_FILE} {amber_flags}",
    ]

    status = "UNEXPECTED_ERROR"

    try:
        result = adb_can_fail(serial, cmd, verbose=True)
    except subprocess.TimeoutExpired:
        result = None
        status = "TIMEOUT"

    if status != "TIMEOUT":
        if result.returncode != 0:
            status = "CRASH"
        elif skip_render:
            status = "SUCCESS"
        else:
            status = "SUCCESS"
            adb_check(
                serial,
                # The /. syntax means the contents of the results directory will be copied into output_dir.
                ["pull", ANDROID_DEVICE_RESULT_DIR, output_dir / "."],
            )

    # Grab log:
    adb_check(serial, ["logcat", "-d"], verbose=True)

    log("\nSTATUS " + status + "\n")

    file_write_text(output_dir / "STATUS", status)

    return output_dir
