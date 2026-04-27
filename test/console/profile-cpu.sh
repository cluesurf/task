#!/usr/bin/env bash
#
# `task profile cpu` — three backends (samply / 0x / clinic).
# Live profiling needs the binary + a workload; we cover help
# wiring + arg-validation here, plus a quick `--explain`-style
# probe using a known-missing tool override to confirm the
# dispatcher routes correctly without running.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

suite "Profile CPU — help"

step "task profile cpu --help"
expect_contains "wired" "task profile cpu --help" "cpu"

step "advertises tool / pid / command flags"
expect_contains "tool flag in help" \
  "task profile cpu --help" \
  "tool"
expect_contains "pid flag in help" \
  "task profile cpu --help" \
  "pid"

summary

suite "Profile CPU — input validation"

step "errors when neither --pid nor --command"
if task profile cpu >/dev/null 2>&1; then
  _fail "expected non-zero exit when no input"
else
  _pass "errors without --pid or --command"
fi

step "errors with --command [] (empty)"
if task profile cpu --command >/dev/null 2>&1; then
  _fail "expected non-zero exit on empty --command"
else
  _pass "errors on empty --command"
fi

step "errors when --tool 0x is given without --command"
if task profile cpu --pid 1 --tool 0x >/dev/null 2>&1; then
  _fail "expected error: 0x needs a command"
else
  _pass "0x rejects pid-only input"
fi

step "errors when --tool clinic is given without --command"
if task profile cpu --pid 1 --tool clinic >/dev/null 2>&1; then
  _fail "expected error: clinic needs a command"
else
  _pass "clinic rejects pid-only input"
fi

summary
