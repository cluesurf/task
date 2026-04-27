#!/usr/bin/env bash
#
# `task trace process` — per-OS strace / dtruss / procmon
# dispatch. Live trace needs root + privileged perms; we cover
# help wiring + arg validation here. The procmon backend
# additionally needs --capture, so we verify that gate.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

suite "Trace process — help"

step "task trace process --help"
expect_contains "wired" "task trace process --help" "process"

step "advertises pid / command / tool flags"
expect_contains "pid in help" \
  "task trace process --help" \
  "pid"
expect_contains "tool in help" \
  "task trace process --help" \
  "tool"

summary

suite "Trace process — input validation"

step "errors when neither --pid nor --command"
if task trace process >/dev/null 2>&1; then
  _fail "expected non-zero exit when no target"
else
  _pass "errors without --pid or --command"
fi

step "errors when --tool procmon without --capture"
if task trace process --pid 1 --tool procmon >/dev/null 2>&1; then
  _fail "expected error: procmon needs --capture"
else
  _pass "procmon rejects missing --capture"
fi

summary
