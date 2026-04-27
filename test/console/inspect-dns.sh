#!/usr/bin/env bash
#
# `task inspect dns` — local-resolver DNS lookup.
# Uses Node's built-in dns module — always runnable.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

suite "Inspect DNS — help + live"

step "task inspect dns --help"
expect_contains "wired" "task inspect dns --help" "dns"

step "task inspect dns cloudflare.com returns records"
expect_contains "records key present" \
  "task inspect dns cloudflare.com 2>&1" \
  "records"

step "task inspect dns cloudflare.com -t MX scopes records"
expect_contains "MX type appears" \
  "task inspect dns cloudflare.com -t MX 2>&1" \
  "MX"

step "task inspect dns nonexistent.invalid returns empty / errors"
expect_contains "empty record set" \
  "task inspect dns nonexistent-task-test-domain.invalid 2>&1" \
  "(records|\\[\\])"

summary
