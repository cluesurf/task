#!/usr/bin/env bash
#
# `task scan env` — secret scanner (gitleaks / trufflehog).
# Help wiring is always exercised; live scan runs only when the
# chosen backend binary is on PATH.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

OUT=tmp/scan-env
mkdir -p "$OUT"

suite "Scan env — help"

step "task scan env --help"
expect_contains "wired" "task scan env --help" "env"

summary

if ! command -v gitleaks >/dev/null 2>&1; then
  printf '\n  (gitleaks not on PATH — skipping live scan)\n'
  exit 0
fi

suite "Scan env — live"

# Seed a fixture with no secrets so the scanner exits 0.
mkdir -p "$OUT/clean"
echo 'API_BASE=https://example.com' > "$OUT/clean/.env"

step "task scan env $OUT/clean (clean tree)"
if (cd "$OUT/clean" && task scan env . >/dev/null 2>&1); then
  _pass "exits 0 on a clean tree"
else
  _fail "expected exit 0 on a clean tree"
fi

summary
