#!/usr/bin/env bash

set -o errexit -o nounset -o pipefail

repo="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

org="majavapaja"
image="majavashakki-ci"

docker build --tag $org/$image:latest --file Dockerfile.ci .
docker push $org/$image:latest
