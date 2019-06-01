
# GraphicsFuzz auto

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Build Status](https://paulthomson.visualstudio.com/gfauto/_apis/build/status/google.graphicsfuzz?branchName=master)](https://paulthomson.visualstudio.com/gfauto/_build/latest?definitionId=2&branchName=master)


## GraphicsFuzz auto is a set of Python scripts for running GraphicsFuzz

[GraphicsFuzz](https://github.com/google/graphicsfuzz) provides tools that automatically find and simplify bugs in graphics shader compilers.
GraphicsFuzz auto (this project) provides scripts for running these tools with minimal interaction.

## Development setup

Execute `./dev_shell.sh.template` (or, copy to `dev_shell.sh` and modify as needed).

### PyCharm

Use PyCharm to open the top-level `gfauto` directory.
It should pick up the `.venv` (virtual environment) automatically
for the code
and also when you open a `Terminal` or `Python Console` tab.

Install and configure plugins:

* Protobuf Support
* File Watchers (may already be installed)
  * Add a file watcher:
    * File type: Python
    * Program: `$PyInterpreterDirectory$/black`
    * Arguments: `$FilePath$`


## Using iPython

Using an iPython shell is useful for modifying artifacts interactively.


```python
# Start iPython, if not running already.
ipython

# Disabling jedi can help with autocompletion of protobuf objects.
%config IPCompleter.use_jedi=False

from gfauto.artifacts import *

# This is executed as a shell command.
cd /data/artifacts

a = ArtifactMetadata()
a.data.glsl_shader_job.shader_job_file = "shader.json"

artifact_write_metadata(a, '//my_glsl_shader_job')
```
