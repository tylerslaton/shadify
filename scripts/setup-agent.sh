#!/bin/bash

# Navigate to the agent directory
cd "$(dirname "$0")/../agent" || exit 1

# Install dependencies using uv with a supported Python version
# PyO3 (jsonschema-rs) does not yet support Python 3.14.
uv sync --python 3.13
