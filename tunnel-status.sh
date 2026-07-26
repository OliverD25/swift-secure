#!/usr/bin/env bash
# Check whether the web server and public tunnel are both up; restart if needed.
# Usage: ./tunnel-status.sh [--restart]
set -uo pipefail

SERVER="${DEPLOY_SERVER:-rde@192.168.88.166}"
PUBLIC_URL="https://swiftsecure.serveousercontent.com/"

# See deploy.sh: Git Bash HOME is not the Windows profile, so ssh needs pointing
# at the profile's key and config or it falls back to a password prompt.
WIN_SSH="${USERPROFILE:-/c/Users/$USER}"
WIN_SSH="${WIN_SSH//\\//}"
WIN_SSH="$(printf '%s' "$WIN_SSH" | sed 's|^\([A-Za-z]\):|/\L\1|')/.ssh"
SSH_OPTS="${DEPLOY_SSH_OPTS:-}"
if [ -z "$SSH_OPTS" ] && [ ! -f "$HOME/.ssh/id_ed25519" ] && [ -f "$WIN_SSH/id_ed25519" ]; then
  SSH_OPTS="-F $WIN_SSH/config -i $WIN_SSH/id_ed25519"
fi

echo "==> Server-side processes"
ssh $SSH_OPTS "$SERVER" 'echo "  web server: $(pgrep -f "http.server 8099" >/dev/null && echo RUNNING || echo STOPPED)"; echo "  tunnel:     $(pgrep -f "swiftsecure:80" >/dev/null && echo RUNNING || echo STOPPED)"'

echo "==> Public URL"
code=$(curl -sL -o /dev/null -w '%{http_code}' --max-time 25 \
  "${PUBLIC_URL}?serveo-skip-browser-warning=true")
echo "  ${PUBLIC_URL} -> HTTP ${code}"

if [ "${1:-}" = "--restart" ]; then
  echo "==> Restarting both"
  ssh $SSH_OPTS "$SERVER" 'pkill -f "http.server 8099"; pkill -f tunnel-serveo; pkill -f "swiftsecure:80"; sleep 2'
  ssh $SSH_OPTS "$SERVER" 'nohup setsid /home/rde/serve-swift.sh > /home/rde/webserver.log 2>&1 < /dev/null & sleep 1; echo "  web server started"'
  ssh $SSH_OPTS "$SERVER" 'nohup setsid /home/rde/tunnel-serveo.sh > /home/rde/serveo.log 2>&1 < /dev/null & sleep 3; echo "  tunnel started"'
fi
