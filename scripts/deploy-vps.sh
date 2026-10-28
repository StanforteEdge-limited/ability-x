#!/usr/bin/env bash
#
# Deploy the site on the VPS: pull, install, build, restart, smoke-test.
#
# Runs as the `ability-x` user. The only privileged step is the restart, which
# deploy/sudoers-ability-x allows. GitHub Actions runs this over SSH on every
# deploy (the key is pinned to this script in ~/.ssh/authorized_keys).
#
#   bash scripts/deploy-vps.sh          # deploy the current branch
#   bash scripts/deploy-vps.sh --check  # build, but do not restart
#
# It does not migrate the database (EmDash does that on the first request
# after the restart) or touch the media (it stays in R2).
set -euo pipefail

APP_DIR="${APP_DIR:-/home/ability-x/app}"
BUILD_ENV="${BUILD_ENV:-/home/ability-x/ability-x.build.env}"
SERVICE="${SERVICE:-ability-x.service}"
CHECK_ONLY=0
[ "${1:-}" = "--check" ] && CHECK_ONLY=1

cd "$APP_DIR"

# Node 24 is installed for this user only (fnm).
FNM_DIR="$HOME/.local/share/fnm"
if [ -d "$FNM_DIR" ]; then
	export PATH="$FNM_DIR:$PATH"
	eval "$(command -v fnm >/dev/null 2>&1 && fnm env --shell bash)"
fi
if ! command -v node >/dev/null 2>&1; then
	echo "node is not on the PATH. Install Node 24 for $USER (docs/AbilityX-VPS-Runbook.md, step 3)." >&2
	exit 1
fi
echo "==> Node $(node --version), npm $(npm --version)"

echo "==> Branch and status"
git rev-parse --abbrev-ref HEAD
if [ -n "$(git status --porcelain)" ]; then
	git status --short
	echo "    the working tree has changes; commit or stash them first" >&2
	exit 1
fi
echo "==> Pull"
git pull --ff-only

echo "==> Install dependencies"
npm ci --no-audit --no-fund

# The site URL, database path and session directory are baked into the
# bundle, so the build needs them. Secrets are read at runtime only.
if [ -f "$BUILD_ENV" ]; then
	echo "==> Build (configuration from $BUILD_ENV)"
	set -a
	# shellcheck disable=SC1090
	. "$BUILD_ENV"
	set +a
else
	echo "    $BUILD_ENV is missing; refusing to build with local defaults" >&2
	exit 1
fi
npm run build

if [ ! -f dist/server/entry.mjs ]; then
	echo "    dist/server/entry.mjs is missing; the build did not finish" >&2
	exit 1
fi

if [ "$CHECK_ONLY" = "1" ]; then
	echo "==> Build OK (not restarting: --check)"
	exit 0
fi

echo "==> Restart $SERVICE"
sudo systemctl restart "$SERVICE"
sleep 2
sudo systemctl status "$SERVICE" --no-pager --lines=10 || true
echo

# Smoke test on the origin itself: GitHub's runners can't reach the site
# through Cloudflare's bot rules. A deploy that leaves the site down fails here.
# PORT comes from the build env (the runtime env is root-only).
PORT_TO_CHECK="${PORT:-4321}"
code=000
for _ in $(seq 1 15); do
	code=$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:${PORT_TO_CHECK}/" || true)
	[ "$code" = "200" ] && break
	sleep 2
done
if [ "$code" != "200" ]; then
	echo "    the site answers $code on 127.0.0.1:${PORT_TO_CHECK} after the restart" >&2
	exit 1
fi
echo "Deployed: the site answers 200 on 127.0.0.1:${PORT_TO_CHECK}"
