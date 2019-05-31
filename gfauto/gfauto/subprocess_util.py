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

import subprocess
from typing import List, Union

from .gflogging import log
from .util import check


def convert_stdout_stderr(
    result: Union[
        subprocess.CalledProcessError,
        subprocess.CompletedProcess,
        subprocess.TimeoutExpired,
    ]
) -> None:

    if result.stdout is not None:
        result.stdout = result.stdout.decode(encoding="utf-8", errors="ignore")
    if result.stderr is not None:
        result.stderr = result.stderr.decode(encoding="utf-8", errors="ignore")


def log_stdout_stderr(
    result: Union[
        subprocess.CalledProcessError,
        subprocess.CompletedProcess,
        subprocess.TimeoutExpired,
    ],
) -> None:

    log("STDOUT:")
    log(result.stdout)
    log("")

    log("STDERR:")
    log(result.stderr)
    log("")


def log_returncode(
    result: Union[
        subprocess.CalledProcessError, subprocess.CompletedProcess, subprocess.Popen
    ],
) -> None:
    log("RETURNCODE: " + str(result.returncode))


def run(
    cmd: List[str], check_exit_code=True, timeout=None, verbose=False
) -> subprocess.CompletedProcess:

    check(
        cmd[0] is not None and isinstance(cmd[0], str),
        AssertionError("run takes a list of str, not a str"),
    )

    # We capture stdout and stderr by default so we have something to report if the command fails.

    # Note: "encoding=" and "errors=" are Python 3.6.
    # We manually decode to utf-8 instead of using "universal_newlines=" so we have full control.
    # text= is Python 3.6.
    # Do not use shell=True.

    # Note: changes here should be reflected in run_catchsegv()

    try:
        log("Exec" + (" (verbose):" if verbose else ":") + str(cmd))

        result = subprocess.run(
            cmd,
            check=check_exit_code,
            timeout=timeout,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )
    except subprocess.TimeoutExpired as ex:
        convert_stdout_stderr(ex)
        # no return code to log in case of timeout
        log_stdout_stderr(ex)
        raise ex

    except subprocess.CalledProcessError as ex:
        convert_stdout_stderr(ex)
        log_returncode(ex)
        log_stdout_stderr(ex)
        raise ex

    convert_stdout_stderr(result)
    log_returncode(result)

    if verbose:
        log_stdout_stderr(result)

    return result
