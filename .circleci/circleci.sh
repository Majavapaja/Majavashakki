#!/usr/bin/env bash

set -o errexit -o nounset -o pipefail

repo="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ -z "$DEPLOYER_PRIVATE_GPG_KEY_BASE64" ]; then
  echo "Environment variable DEPLOYER_PRIVATE_GPG_KEY_BASE64 is required"
  exit 1
fi

echo $DEPLOYER_PRIVATE_GPG_KEY_BASE64 | base64 --decode > private.key
gpg --import private.key
rm -f private.key

apt-get update
apt-get install -y python3-venv

pip3 install -r ./deployment/requirements.txt
./deploy.sh
