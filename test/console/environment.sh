#!/usr/bin/env bash
# set / get environment against a throwaway .env file.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

OUT=tmp/env
mkdir -p "$OUT"
ENV_FILE="$OUT/.env.test"
rm -f "$ENV_FILE"

suite "Environment"

step "set with two positionals"
task set environment API_KEY sk-abc --file "$ENV_FILE" -f text >/dev/null 2>&1
expect_file "$ENV_FILE"
expect_contains "KEY=VALUE present" "cat $ENV_FILE" "^API_KEY=sk-abc$"

step "update key in place"
task set environment API_KEY sk-xyz --file "$ENV_FILE" -f text >/dev/null 2>&1
expect_contains "updated" "cat $ENV_FILE" "^API_KEY=sk-xyz$"
expect "one line for key" test "$(grep -c '^API_KEY=' "$ENV_FILE")" -eq 1

step "second key appends"
task set environment LOG_LEVEL info --file "$ENV_FILE" -f text >/dev/null 2>&1
expect_contains "second key" "cat $ENV_FILE" "^LOG_LEVEL=info$"

step "get from file"
GOT=$(task get environment API_KEY --file "$ENV_FILE" -f text 2>&1)
expect "got latest" test "$GOT" = 'sk-xyz'

step "get from process env"
LIVE=$(task get environment HOME -f text 2>&1)
expect "matches \$HOME" test "$LIVE" = "$HOME"

summary
