#!/usr/bin/env bash
# Build the site and publish it to the Ubuntu server behind the serveo tunnel.
# Usage: ./deploy.sh
set -euo pipefail

SERVER="${DEPLOY_SERVER:-rde@192.168.88.166}"
REMOTE_DIR="swift-secure-site"
PUBLIC_URL="https://swiftsecure.serveousercontent.com/"

echo "==> Building..."
npm run build

# Upload to a staging dir, then swap it in. The swap is a rename, so a visitor
# never sees a half-copied site and the running web server needs no restart —
# it resolves the directory path fresh on each request.
echo "==> Uploading..."
ssh "$SERVER" "rm -rf ~/${REMOTE_DIR}.new && mkdir -p ~/${REMOTE_DIR}.new"
scp -q -r dist/* "$SERVER:~/${REMOTE_DIR}.new/"

echo "==> Swapping in..."
ssh "$SERVER" "rm -rf ~/${REMOTE_DIR}.old && \
  mv ~/${REMOTE_DIR} ~/${REMOTE_DIR}.old && \
  mv ~/${REMOTE_DIR}.new ~/${REMOTE_DIR} && \
  rm -rf ~/${REMOTE_DIR}.old"

echo "==> Verifying..."
code=$(curl -sL -o /dev/null -w '%{http_code}' --max-time 25 \
  "${PUBLIC_URL}?serveo-skip-browser-warning=true")
if [ "$code" = "200" ]; then
  echo "Live at ${PUBLIC_URL} (HTTP $code)"
else
  echo "WARNING: site returned HTTP $code — check the tunnel with ./tunnel-status.sh" >&2
  exit 1
fi
