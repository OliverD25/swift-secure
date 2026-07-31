#!/usr/bin/env bash
# Build and publish from the machine that already hosts the site.
#
# deploy.sh is the companion for the *workstation*: it builds locally and copies
# 4,400+ files across the network. That is unusable from a phone-driven session,
# where the server is the only machine awake. This script does the same job with
# no network hop, so a remote session can ship on its own.
#
# Usage (on the homelab): ./publish.sh
set -euo pipefail

DOCROOT="${DOCROOT:-$HOME/swift-secure-site}"
PUBLIC_URL="${PUBLIC_URL:-https://swiftsecure.serveousercontent.com/}"

cd "$(dirname "$0")"
export PATH="$HOME/.local/node/bin:$PATH"

# Canonical URLs and the sitemap bake the origin in at build time, so the
# preview must be told where it actually lives.
export SITE="${SITE:-${PUBLIC_URL%/}}"

echo "==> Building..."
npm run build

# Stage beside the docroot, not inside it: the swap below is only atomic while
# both paths sit on the same filesystem.
echo "==> Swapping in..."
rm -rf "$DOCROOT.new" "$DOCROOT.old"
cp -r dist "$DOCROOT.new"
if [ -d "$DOCROOT" ]; then mv "$DOCROOT" "$DOCROOT.old"; fi
mv "$DOCROOT.new" "$DOCROOT"
rm -rf "$DOCROOT.old"

echo "==> Verifying..."
code=$(curl -sL -o /dev/null -w '%{http_code}' --max-time 25 \
  "${PUBLIC_URL}?serveo-skip-browser-warning=true" || echo 000)
if [ "$code" = "200" ]; then
  echo "Live at ${PUBLIC_URL} (HTTP $code)"
else
  echo "WARNING: site returned HTTP $code — check: systemctl --user status swift-tunnel" >&2
  exit 1
fi
