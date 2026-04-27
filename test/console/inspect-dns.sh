#!/usr/bin/env bash
#
# `task inspect dns` — local-resolver DNS lookup.
# No external binary required (uses Node's built-in dns module),
# so we always run both the help wiring and a live probe.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

suite "Inspect DNS — help + lookup"

step "task inspect dns --help"
expect_contains "wired" "task inspect dns --help" "dns"

step "task inspect dns cloudflare.com"
expect_contains "records" \
  "task inspect dns cloudflare.com 2>&1" \
  "records"

step "task inspect dns cloudflare.com -t MX"
expect_contains "MX" \
  "task inspect dns cloudflare.com -t MX 2>&1" \
  "(MX|records)"

summary
