#!/usr/bin/env bash
#
# `task set environment` / `task get environment`, hand-wired to a
# temp .env file so no real shell state is touched.

set -euo pipefail
cd "$(dirname "$0")/../.."
. test/lib.sh

OUT=tmp/env
mkdir -p "$OUT"
ENV_FILE="$OUT/.env.test"
rm -f "$ENV_FILE"

suite "Environment"

step "set environment — two positionals"
task set environment API_KEY sk-abc123 --file "$ENV_FILE" -f text >/dev/null
expect_file "$ENV_FILE"
expect "file contains KEY=VALUE" test -n "$(grep '^API_KEY=sk-abc123$' "$ENV_FILE" || true)"

step "set environment — update existing key"
task set environment API_KEY sk-xyz789 --file "$ENV_FILE" -f text >/dev/null
expect "value updated" test -n "$(grep '^API_KEY=sk-xyz789$' "$ENV_FILE" || true)"
expect "only one line for the key" test "$(grep -c '^API_KEY=' "$ENV_FILE")" -eq 1

step "set environment — second key appended"
task set environment LOG_LEVEL info --file "$ENV_FILE" -f text >/dev/null
expect "second key present" test -n "$(grep '^LOG_LEVEL=info$' "$ENV_FILE" || true)"

step "get environment — from file"
GOT=$(task get environment API_KEY --file "$ENV_FILE" -f text 2>&1)
expect "got latest value" test "$GOT" = 'sk-xyz789'

step "get environment — from process"
LIVE=$(HOME_ALIAS="$HOME" task get environment HOME -f text 2>&1)
expect "matches \$HOME" test "$LIVE" = "$HOME"

summary
