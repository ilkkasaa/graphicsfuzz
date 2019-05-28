
# GraphicsFuzz auto

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## GraphicsFuzz auto is a set of Python scripts for running GraphicsFuzz

[GraphicsFuzz](https://github.com/google/graphicsfuzz) provides tools that automatically find and simplify bugs in graphics shader compilers.
GraphicsFuzz auto (this project) provides scripts for running these tools with minimal interaction.

## Development setup

We currently target Python 3.6.
We assume `python3` will execute this version and that you also have `pip` installed for this version of Python (which might be the `pip3` package in your system's package manager).

```sh
# Change to the project root.
cd gf-auto

# Install pipenv using pip.
python3 -m pip install pipenv --user

# The following (optional) line causes the virtual environment to be placed at
# `gf-auto/.venv`. You may wish to add this environment variable permanently,
# such as by adding to your .bashrc file.
export PIPENV_VENV_IN_PROJECT=1

# Install project dependencies, including development dependencies, into a
# virtual environment using pipenv.
python3 -m pipenv install --dev

# Enter the virtual environment.
python3 -m pipenv shell

# `python` should now point to the correct version of Python.
python --version

# Output:
# Python 3.X.X
# (gf-auto)

# Exit the shell to execute other pipenv commands, if needed.
exit
python3 -m pipenv

```


