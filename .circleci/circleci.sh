#!/usr/bin/env bash

set -o errexit -o nounset -o pipefail

repo="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ -z "$DEPLOYER_PRIVATE_GPG_KEY_BASE64" ]; then
  echo "Environment variable DEPLOYER_PRIVATE_GPG_KEY_BASE64 is required"
  exit 1
fi

apt-get update
apt-get install -y git gnupg python3-pip python3-venv curl

# Chrome dependencies
# https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix
apt-get install -y \
  gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 \
  libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 \
  libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 \
  libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation \
  libappindicator1 libnss3 lsb-release xdg-utils wget

# Install nodejs for running tests
curl -sL https://deb.nodesource.com/setup_10.x | bash -
apt-get install -y nodejs

echo $DEPLOYER_PRIVATE_GPG_KEY_BASE64 | base64 --decode > private.key
gpg --import private.key
rm -f private.key

./deploy.sh
