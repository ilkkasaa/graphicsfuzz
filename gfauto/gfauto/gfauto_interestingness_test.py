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
import argparse
import sys
from pathlib import Path
from typing import Optional

from gfauto import fuzz, proto_util
from gfauto.gflogging import log
from gfauto.test_pb2 import Test
from gfauto.util import check, check_file_exists, file_read_text, test_metadata_read


# TODO: Maybe add helper method and throw exceptions instead of calling sys.exit.

# TODO: Could we make the interestingness test the only way of running a shader job (or indeed, any test)?
#  We would want to pass the output directory (default is one will be created, as is currently the case), the test_json,
#  no crash signature nor device (we could get that from the test_json), although perhaps these could be overridden?
#  A device (or test?) could then even specify a custom interestingness command, although the default one would probably
#  be the same for all devices and it would look at the device info in the test_json?


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Interestingness test that runs a shader using Amber, "
        "calculates the crash signature based on the result, and returns 0 "
        "if the signature matches the expected crash signature."
    )

    parser.add_argument(
        "test_json",
        help="The .json test metadata file path that describes how to run the test.",
    )
    parser.add_argument("shader_job_json", help="The .json shader job file path.")
    parser.add_argument(
        "--crash_signature",
        help="The crash signature string that is expected. "
        "Note that the crash signature is calculated using a hard-coded algorithm; you cannot just provide a "
        "string from the log.txt file.",
    )

    parsed_args = parser.parse_args(sys.argv[1:])

    test_json: Path = Path(parsed_args.test_json)
    shader_job_json: Path = Path(parsed_args.shader_job_json)
    crash_signature: Optional[str] = parsed_args.crash_signature

    check_file_exists(test_json)
    check_file_exists(shader_job_json)

    # TODO: Remove this when we support other reduction types.
    check(bool(crash_signature), AssertionError("crash_signature is required for now"))

    test = test_metadata_read(test_json)

    check(
        test.HasField("glsl"),
        AssertionError(f"Provided test json {str(test_json)} does not have glsl entry"),
    )

    output_dir = fuzz.run_shader_job(
        shader_job_json, output_dir=shader_job_json.with_suffix(""), test_glsl=test.glsl
    )

    log(
        f"gfauto_intestingness_test: finished running {str(shader_job_json)} in {str(output_dir)}."
    )

    status = fuzz.result_get_status(output_dir)
    if status not in ("CRASH", "HOST_CRASH"):
        log("Shader run did not crash; not interesting.")
        sys.exit(1)

    log_contents = file_read_text(fuzz.result_get_log_path(output_dir))
    signature = fuzz.get_signature_from_log_contents(log_contents)

    log(f"Expected signature: {crash_signature}")
    log(f"Actual   signature: {signature}")

    if signature == crash_signature:
        log("Interesting!")
        return

    log("Not interesting")
    sys.exit(1)


if __name__ == "__main__":
    main()
    sys.exit(0)
