#!/usr/bin/env bash
# process / port / inspect — read-only, just poke the shape.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

suite "Process"

step "list process — table headers"
expect_contains "PID header" "task list process --limit 5 -f text" "^PID"
expect_contains "USER header" "task list process --limit 5 -f text" "USER"

step "list process --layout tree"
expect_contains "tree glyph" "task list process --layout tree -f text" "├|└"

step "list port — PORT header"
expect_contains "PORT header" "task list port -f text" "PORT"

step "inspect own pid"
expect_contains "shows pid" "task inspect process $$ -f text" "^pid +$$"

summary
