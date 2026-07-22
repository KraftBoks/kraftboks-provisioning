#!/bin/sh
set -eu

# The package file and this marker are both stored in the persistent Node-RED
# data directory.  That makes the dependency installation repeatable after a
# reboot but avoids downloading packages every time the Compose stack starts.
marker=/data/node_modules/.kraftboks-deps-v1

if [ -f "$marker" ]; then
  exit 0
fi

test -f /data/package.json
mkdir -p /data/node_modules
npm install --omit=dev --unsafe-perm --no-audit --no-fund --no-update-notifier
touch "$marker"
