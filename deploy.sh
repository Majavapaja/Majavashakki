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
  npm_ci_if_package_lock_has_changed
  npm run deploy
  popd
}

function build {
  pushd "$repo"
  npm_ci_if_package_lock_has_changed
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

function npm_ci_if_package_lock_has_changed {
  echo "Checking if npm ci needs to be run"
  local -r checksum_file="./node_modules/.package-lock.json.checksum"

  function run_npm_ci {
    npm ci
    shasum package-lock.json > "$checksum_file"
  }

  if [ ! -f "$checksum_file" ]; then
    echo "no existing package-lock.json checksum found, running npm ci"
    run_npm_ci
  elif ! shasum --check "$checksum_file"; then
    echo "package-lock.json seems to have changed, running npm ci"
    run_npm_ci
  else
    echo "package-lock.json doesn't seem to have changed, skipping npm ci"
  fi
}

main "$@"
