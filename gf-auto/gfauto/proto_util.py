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
