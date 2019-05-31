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

import io
from typing import List, Union

log_to_stdout = True
log_to_stream = []  # type: List[Union[io.TextIOBase, io.StringIO]]


def push_stream_for_logging(stream: Union[io.TextIOBase, io.StringIO]):
    log_to_stream.append(stream)


def pop_stream_for_logging():
    log_to_stream.pop()


def log(message: str) -> None:
    if log_to_stdout:
        print(message, flush=True)  # noqa T001
    for stream in log_to_stream:
        stream.write(message)
        stream.write("\n")
        stream.flush()
