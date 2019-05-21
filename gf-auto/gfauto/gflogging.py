

import io
from typing import Optional, List, Union

log_to_stdout = True
log_to_stream = []  # type: List[Union[io.TextIOBase, io.StringIO]]


def push_stream_for_logging(stream: Union[io.TextIOBase, io.StringIO]):
    log_to_stream.append(stream)


def pop_stream_for_logging():
    log_to_stream.pop()


def log(message: str) -> None:
    if log_to_stdout:
        print(message, flush=True)
    for stream in log_to_stream:
        stream.write(message)
        stream.write('\n')
        stream.flush()
