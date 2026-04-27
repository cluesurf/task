#!/usr/bin/env bash
#
# `task inspect tls` — TLS chain inspector.
#   1. Help wiring is reachable (no openssl needed).
#   2. Live probe against a public host when openssl is on PATH.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

suite "Inspect TLS — help"

step "task inspect tls --help"
expect_contains "wired" "task inspect tls --help" "tls"

summary

if ! command -v openssl >/dev/null 2>&1; then
  printf '\n  (openssl not on PATH — skipping live probe)\n'
  exit 0
fi

suite "Inspect TLS — live probe"

step "task inspect tls clue.surf returns a chain"
expect_contains "subject" \
  "task inspect tls clue.surf 2>&1" \
  "subject"

summary
