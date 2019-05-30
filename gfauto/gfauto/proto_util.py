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

from google.protobuf import json_format
from google.protobuf.message import Message


def json_to_message(json: str, message: Message):
    json_format.Parse(json, message)


def message_to_json(
    message: Message, including_default_value_fields: bool = False
) -> str:
    return json_format.MessageToJson(
        message,
        including_default_value_fields=including_default_value_fields,
        preserving_proto_field_name=True,
        sort_keys=True,
    )
