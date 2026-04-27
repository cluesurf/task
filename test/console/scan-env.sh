#!/usr/bin/env bash
#
# `task scan env` — gitleaks / trufflehog. Help wiring + arg
# validation always; live scan only when the chosen binary is
# on PATH.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

OUT=tmp/scan-env
mkdir -p "$OUT"

suite "Scan env — help + dispatch"

step "task scan env --help"
expect_contains "wired" "task scan env --help" "env"

step "advertises tool / history / report flags"
expect_contains "tool flag" "task scan env --help" "tool"
expect_contains "history flag" "task scan env --help" "history"

summary

suite "Scan env — gitleaks (skip when missing)"

if ! command -v gitleaks >/dev/null 2>&1; then
  printf '\n  (gitleaks not on PATH — skipping live cases)\n'
else
  # Seed two trees: one clean, one with a planted token.
  rm -rf "$OUT/clean" "$OUT/leaky"
  mkdir -p "$OUT/clean" "$OUT/leaky"
  echo 'API_BASE=https://example.com' > "$OUT/clean/.env"
  cat > "$OUT/leaky/config.py" <<'PY'
AWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"
AWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
PY

  step "exits 0 on a clean tree"
  if (cd "$OUT/clean" && task scan env . >/dev/null 2>&1); then
    _pass "exits 0 when no secrets"
  else
    _fail "expected exit 0 on a clean tree"
  fi

  step "exits non-zero when a secret is detected"
  if (cd "$OUT/leaky" && task scan env . >/dev/null 2>&1); then
    _fail "expected non-zero exit on a leaky tree"
  else
    _pass "non-zero on detected secrets"
  fi

  step "writes a JSON report when --report is given"
  task scan env "$OUT/leaky" --report "$OUT/leaks.json" --report-format json \
    >/dev/null 2>&1 || true
  expect_file "$OUT/leaks.json"
fi

summary

suite "Scan env — trufflehog (skip when missing)"

if ! command -v trufflehog >/dev/null 2>&1; then
  printf '\n  (trufflehog not on PATH — skipping)\n'
else
  step "exits 0 on a clean tree via trufflehog"
  if task scan env "$OUT/clean" --tool trufflehog >/dev/null 2>&1; then
    _pass "trufflehog clean-tree exit"
  else
    _fail "expected trufflehog to exit 0 on a clean tree"
  fi
fi

summary
