#!/usr/bin/env bash

set -o errexit -o nounset -o pipefail

repo="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

function main {
  cd "$repo"

  use_nodejs_version "10.17.0"

  build
  run_tests
  deploy
}

function deploy {
  pushd "$repo/deployment"
  npm --prefer-offline ci
  npm run deploy
  popd
}

function build {
  pushd "$repo"
  npm --prefer-offline ci
  npm run lint
  npm run build
  popd
}

function run_tests {
  pushd "$repo"
  TS_NODE_FILES=true npm run test
  TS_NODE_FILES=true npm run test:browser
  popd
}

function use_nodejs_version {
  local node_version="$1"

  set +o nounset
  export NVM_DIR="${NVM_DIR:-$HOME/.cache/nvm}"
  source "$repo/nvm.sh"
  nvm install "$node_version"
  nvm use "$node_version"
  set -o nounset
}

main "$@"
