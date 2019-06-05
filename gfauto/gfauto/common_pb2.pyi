# @generated by generate_proto_mypy_stubs.py.  Do not edit!
import sys
from google.protobuf.internal.containers import (
    RepeatedCompositeFieldContainer as google___protobuf___internal___containers___RepeatedCompositeFieldContainer,
)

from google.protobuf.message import (
    Message as google___protobuf___message___Message,
)

from typing import (
    Iterable as typing___Iterable,
    Optional as typing___Optional,
    Text as typing___Text,
)

from typing_extensions import (
    Literal as typing_extensions___Literal,
)


class Binary(google___protobuf___message___Message):
    name = ... # type: typing___Text
    platform = ... # type: typing___Text
    path = ... # type: typing___Text

    def __init__(self,
        name : typing___Optional[typing___Text] = None,
        platform : typing___Optional[typing___Text] = None,
        path : typing___Optional[typing___Text] = None,
        ) -> None: ...
    @classmethod
    def FromString(cls, s: bytes) -> Binary: ...
    def MergeFrom(self, other_msg: google___protobuf___message___Message) -> None: ...
    def CopyFrom(self, other_msg: google___protobuf___message___Message) -> None: ...
    if sys.version_info >= (3,):
        def ClearField(self, field_name: typing_extensions___Literal[u"name",u"path",u"platform"]) -> None: ...
    else:
        def ClearField(self, field_name: typing_extensions___Literal[b"name",b"path",b"platform"]) -> None: ...

class Archive(google___protobuf___message___Message):
    url = ... # type: typing___Text
    output_file = ... # type: typing___Text
    output_directory = ... # type: typing___Text

    def __init__(self,
        url : typing___Optional[typing___Text] = None,
        output_file : typing___Optional[typing___Text] = None,
        output_directory : typing___Optional[typing___Text] = None,
        ) -> None: ...
    @classmethod
    def FromString(cls, s: bytes) -> Archive: ...
    def MergeFrom(self, other_msg: google___protobuf___message___Message) -> None: ...
    def CopyFrom(self, other_msg: google___protobuf___message___Message) -> None: ...
    if sys.version_info >= (3,):
        def ClearField(self, field_name: typing_extensions___Literal[u"output_directory",u"output_file",u"url"]) -> None: ...
    else:
        def ClearField(self, field_name: typing_extensions___Literal[b"output_directory",b"output_file",b"url"]) -> None: ...

class ArchiveSet(google___protobuf___message___Message):

    @property
    def archives(self) -> google___protobuf___internal___containers___RepeatedCompositeFieldContainer[Archive]: ...

    @property
    def binaries(self) -> google___protobuf___internal___containers___RepeatedCompositeFieldContainer[Binary]: ...

    def __init__(self,
        archives : typing___Optional[typing___Iterable[Archive]] = None,
        binaries : typing___Optional[typing___Iterable[Binary]] = None,
        ) -> None: ...
    @classmethod
    def FromString(cls, s: bytes) -> ArchiveSet: ...
    def MergeFrom(self, other_msg: google___protobuf___message___Message) -> None: ...
    def CopyFrom(self, other_msg: google___protobuf___message___Message) -> None: ...
    if sys.version_info >= (3,):
        def ClearField(self, field_name: typing_extensions___Literal[u"archives",u"binaries"]) -> None: ...
    else:
        def ClearField(self, field_name: typing_extensions___Literal[b"archives",b"binaries"]) -> None: ...
