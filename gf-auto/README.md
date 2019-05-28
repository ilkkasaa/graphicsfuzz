
# GraphicsFuzz auto

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## GraphicsFuzz auto is a set of Python scripts for running GraphicsFuzz

[GraphicsFuzz](https://github.com/google/graphicsfuzz) provides tools that automatically find and simplify bugs in graphics shader compilers.
GraphicsFuzz auto (this project) provides scripts for running these tools with minimal interaction.

## Development setup

Execute `./dev_shell.sh.template` (or, copy to `dev_shell.sh` and modify as needed).

For iPython, you may want to disable Jedi autocomplete to get better autocomplete:

```python
ipython

%config IPCompleter.use_jedi=False

from gfauto.artifacts import *

a = ArtifactMetadata()
a.data.glsl_[TAB]
a.data.glsl_shader_job.SetInParent()
a

Out[5]:
data {
  glsl_shader_job {
  }
}

artifact_write_metadata(a, '//my_shader')

```

