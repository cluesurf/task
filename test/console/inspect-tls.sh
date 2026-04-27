#!/usr/bin/env bash
#
# `task inspect tls` — TLS chain inspector.
#   1. Help wiring is reachable (no openssl needed).
#   2. Live probe against a public host when openssl is on PATH.
#   3. Error path when the host can't be reached.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

suite "Inspect TLS — help"

step "task inspect tls --help"
expect_contains "wired" "task inspect tls --help" "tls"

step "rejects missing positional"
if task inspect tls >/dev/null 2>&1; then
  _fail "expected non-zero exit when no host given"
else
  _pass "errors without a host"
fi

summary

if ! command -v openssl >/dev/null 2>&1; then
  printf '\n  (openssl not on PATH — skipping live probe)\n'
  exit 0
fi

suite "Inspect TLS — live probe"

step "task inspect tls clue.surf returns a chain"
expect_contains "subject field present" \
  "task inspect tls clue.surf 2>&1" \
  "subject"

step "task inspect tls clue.surf --port 443"
expect_contains "port honored" \
  "task inspect tls clue.surf --port 443 2>&1" \
  "subject"

step "errors on a non-existent host"
if task inspect tls definitely-not-a-real-host.invalid >/dev/null 2>&1; then
  _fail "expected non-zero exit on unreachable host"
else
  _pass "errors on unreachable host"
fi

summary
