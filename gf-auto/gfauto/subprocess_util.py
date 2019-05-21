

import subprocess
from typing import List, Union

from .gflogging import log


def convert_stdout_stderr(
    result: Union[
        subprocess.CalledProcessError, subprocess.CompletedProcess, subprocess.TimeoutExpired]
) -> None:

    if result.stdout is not None:
        result.stdout = result.stdout.decode(encoding='utf-8', errors='ignore')
    if result.stderr is not None:
        result.stderr = result.stderr.decode(encoding='utf-8', errors='ignore')


def log_stdout_stderr(
    result: Union[
        subprocess.CalledProcessError,
        subprocess.CompletedProcess,
        subprocess.TimeoutExpired,
    ],
) -> None:

    log('STDOUT:')
    log(result.stdout)
    log('')

    log('STDERR:')
    log(result.stderr)
    log('')


def log_returncode(
    result: Union[
        subprocess.CalledProcessError, subprocess.CompletedProcess, subprocess.Popen],
) -> None:
    log('RETURNCODE: ' + str(result.returncode))


def run(
    cmd: List[str],
    check=True,
    timeout=None,
    verbose=False
) -> subprocess.CompletedProcess:

    assert cmd[0] is not None and isinstance(cmd[0], str)

    # We capture stdout and stderr by default so we have something to report if the command fails.

    # Note: "encoding=" and "errors=" are Python 3.6.
    # We manually decode to utf-8 instead of using "universal_newlines=" so we have full control.
    # text= is Python 3.6.
    # Do not use shell=True.

    # Note: changes here should be reflected in run_catchsegv()

    try:
        log('Exec' + (' (verbose):' if verbose else ':') + str(cmd))

        result = subprocess.run(
            cmd,
            check=check,
            timeout=timeout,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )
    except subprocess.TimeoutExpired as ex:
        convert_stdout_stderr(ex)
        # no returncode to log in case of timeout
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



