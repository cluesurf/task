#!/usr/bin/env bash
# process / port — read-only shape checks.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

suite "Process"

step "list process — headers + rows"
expect_contains "PID header" "task list process --limit 5 -f text" "^PID"
expect_contains "USER header" "task list process --limit 5 -f text" "USER"

step "list process tree — parent 0 (kernel) always has children"
expect_contains "tree glyphs" "task list process --layout tree -f text" "[├└]"

step "list port — header"
expect_contains "PORT header" "task list port -f text" "PORT"

step "inspect shell's parent pid"
PPID_SELF=$PPID
expect_contains "pid row" "task inspect process $PPID_SELF -f text" "^pid "

summary
