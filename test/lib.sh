# shellcheck shell=bash
#
# Tiny test harness for `test/console/*.sh`. Each suite uses:
#   suite "<name>"
#   step  "<description>"
#   expect_contains "<label>" "<command>" "<grep-pattern>"
#   expect_file     "<path>"        # exists and non-empty
#   expect_eq       "<label>" "<actual>" "<expected>"
#   summary                         # prints pass/fail and exits non-zero on fail
#
# Steps don't halt the run on failure — the suite finishes and
# `summary` returns the right exit code so CI gets a single
# overall verdict per suite. `task/console/all.sh` aggregates.

# `task` runs the local CLI through tsx so live edits are picked up.
task() {
  pnpm tsx code/console "$@"
}

_PASS=0
_FAIL=0
_SUITE=""
_STEP=""

suite() {
  _SUITE="$1"
  printf '\n=== %s ===\n' "$_SUITE"
}

step() {
  _STEP="$1"
  printf '  • %s\n' "$_STEP"
}

_pass() {
  _PASS=$((_PASS + 1))
  printf '    ✓ %s\n' "$1"
}

_fail() {
  _FAIL=$((_FAIL + 1))
  printf '    ✗ %s\n' "$1"
}

expect_contains() {
  local label="$1"
  local command="$2"
  local pattern="$3"
  local out
  if ! out=$(eval "$command" 2>&1); then
    _fail "$label (command failed: $command)"
    return
  fi
  if printf '%s' "$out" | grep -Eq "$pattern"; then
    _pass "$label"
  else
    _fail "$label (no match for /$pattern/ in output)"
  fi
}

expect_file() {
  local path="$1"
  if [ -s "$path" ]; then
    _pass "file $path"
  else
    _fail "missing or empty: $path"
  fi
}

expect_eq() {
  local label="$1"
  local actual="$2"
  local expected="$3"
  if [ "$actual" = "$expected" ]; then
    _pass "$label"
  else
    _fail "$label (got \"$actual\", want \"$expected\")"
  fi
}

summary() {
  printf '\n  %d passed, %d failed in %s\n' "$_PASS" "$_FAIL" "$_SUITE"
  [ "$_FAIL" -eq 0 ]
}
