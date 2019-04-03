#!/usr/bin/env bash

set -o errexit -o nounset -o pipefail

repo="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

npm ci
npm run lint
npm run build
TS_NODE_FILES=true npm test

if [ ! -d "$repo/deployment/.venv" ]; then
  python3 -m venv "$repo/deployment/.venv"
fi

set +o nounset
source "$repo/deployment/.venv/bin/activate"
set -o nounset
pip install -r "$repo/deployment/requirements.txt" &> /dev/null
python "$repo/deployment/deploy.py"
