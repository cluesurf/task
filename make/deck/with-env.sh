#!/usr/bin/env bash
# Source the task package's .env (if present), then exec the rest
# of the args. Used by every pnpm host:pkg* script so publishers
# can read APT_REPO_DIR / APT_SIGNING_KEY / etc. without forcing
# the user to `set -a; source .env` per shell.
#
# .env is gitignored and lives in the task package root.

set -a
root="$(cd "$(dirname "$0")/../.." && pwd)"
[ -f "$root/.env" ] && . "$root/.env"
set +a
exec "$@"
