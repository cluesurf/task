#!/usr/bin/env bash
#
# Process / port / inspect CLI. Read-only — starts no subprocesses
# other than the shells that ps picks up naturally.

set -euo pipefail
cd "$(dirname "$0")/../.."
. test/lib.sh

suite "Process"

step "list process — table has PID / USER headers"
OUTPUT=$(task list process --limit 5 -f text 2>&1)
expect "has PID header" test -n "$(echo "$OUTPUT" | grep -E '^PID')"
expect "has USER header" test -n "$(echo "$OUTPUT" | grep 'USER')"

step "list process --top memory"
TOP=$(task list process --top memory --limit 3 -f text 2>&1)
expect "three rows of data" test "$(echo "$TOP" | grep -cE '^[0-9]+[[:space:]]')" -eq 3

step "list process --layout tree"
TREE=$(task list process --layout tree -f text 2>&1 | head -20)
expect "uses tree glyphs" test -n "$(echo "$TREE" | grep -E '├|└')"

step "list port — table has PORT header"
PORTS=$(task list port -f text 2>&1 | head -10)
expect "has PORT header" test -n "$(echo "$PORTS" | grep PORT)"

step "inspect process — own pid resolves"
MY=$$
INFO=$(task inspect process "$MY" -f text 2>&1)
expect "shows pid row" test -n "$(echo "$INFO" | grep -E '^pid[[:space:]]+'"$MY")"

summary
