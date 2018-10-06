#!/usr/bin/env bash

set -o errexit -o nounset -o pipefail

repo="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ -z "$DEPLOYER_PRIVATE_GPG_KEY_BASE64" ]; then
  echo "Environment variable DEPLOYER_PRIVATE_GPG_KEY_BASE64 is required"
  exit 1
fi

# Install nodejs for running tests
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs

# Run tests
npm ci
MajavashakkiMongoConnectionString="mongodb://majavashakki:majavashakki@localhost:27017/Majavashakki" \
npm test

apt-get update
apt-get install -y git gnupg python3-pip python3-venv

echo $DEPLOYER_PRIVATE_GPG_KEY_BASE64 | base64 --decode > private.key
gpg --import private.key
rm -f private.key

./deploy.sh
