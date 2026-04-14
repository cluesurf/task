#!/usr/bin/env bash
# Fetch — backend routing via --dry-run so we can verify the
# generated command without actually reaching the network.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

suite "Fetch"

step "single URL routes to curl"
expect_contains "curl invocation" \
  "task fetch https://example.com -o /tmp/x --dry-run --verbose" \
  "^curl "

step "concurrency routes to aria2c"
expect_contains "aria2c invocation" \
  "task fetch https://host/big --concurrency 4 --dry-run --verbose" \
  "^aria2c "

step "mirror routes to wget"
expect_contains "wget invocation" \
  "task fetch https://example.com --mirror --dry-run --verbose" \
  "^wget "

step "auth flag passed through"
expect_contains "bearer header" \
  "task fetch https://api.example.com --token TOK --dry-run --verbose" \
  "Authorization: Bearer TOK"

summary
