#!/usr/bin/env bash
#
# Shared test scaffolding for `test/*.sh`. Source from any test
# script:
#
#   . "$(dirname "$0")/lib.sh"
#   suite "Audio"
#   step "pad mp3 to 3 minutes"
#   task pad -i ... -o ...
#   expect_file out.mp3
#   summary
#
# Output is colored when stdout is a TTY (ANSI is auto-stripped
# in pipes by `tput`'s availability check). Each `step` increments
# a counter and starts a new section; failures collect into the
# summary but don't exit so subsequent steps still run. `summary`
# exits non-zero when any step failed.

set -euo pipefail

# ---- ANSI helpers --------------------------------------------------

if [ -t 1 ] && command -v tput >/dev/null 2>&1; then
  __DIM=$(tput setaf 8 2>/dev/null || printf '')
  __CYAN=$(tput setaf 6 2>/dev/null || printf '')
  __GREEN=$(tput setaf 2 2>/dev/null || printf '')
  __RED=$(tput setaf 1 2>/dev/null || printf '')
  __BOLD=$(tput bold 2>/dev/null || printf '')
  __RESET=$(tput sgr0 2>/dev/null || printf '')
else
  __DIM=''; __CYAN=''; __GREEN=''; __RED=''; __BOLD=''; __RESET=''
fi

# ---- state ---------------------------------------------------------

__SUITE_NAME=""
__STEP_NAME=""
__STEP_INDEX=0
__STEP_PASS=0
__STEP_FAIL=0
__FAILURES=()

# ---- public ---------------------------------------------------------

# `task` runs the local CLI silently (no pnpm chatter, no node
# warnings). Override with TASK_BIN=... when bisecting against an
# installed binary.
TASK_BIN="${TASK_BIN:-pnpm --silent tsx code/console.ts}"

task() {
  $TASK_BIN "$@" 2> >(grep -vE "DeprecationWarning|trace-deprecation" >&2)
}

# Print a suite headline once at the top.
suite() {
  __SUITE_NAME="$1"
  printf "\n%s%s%s %s%s%s\n" "$__BOLD" "$__CYAN" "$__SUITE_NAME" "$__DIM" "test suite" "$__RESET"
  printf "%s%s%s\n" "$__DIM" "$(_rule)" "$__RESET"
}

# Open a new step. Closes the previous one as a pass.
step() {
  if [ -n "$__STEP_NAME" ]; then
    _close_pass
  fi
  __STEP_INDEX=$((__STEP_INDEX + 1))
  __STEP_NAME="$1"
  printf "\n%s%2d.%s %s%s%s\n" "$__DIM" "$__STEP_INDEX" "$__RESET" "$__BOLD" "$__STEP_NAME" "$__RESET"
}

# Print a sub-line under the current step (dim grey).
note() {
  printf "    %s%s%s\n" "$__DIM" "$*" "$__RESET"
}

# Assert a file exists. Prints `make <path> (N bytes)` on success.
expect_file() {
  local path="$1"
  if [ -f "$path" ]; then
    local bytes
    bytes=$(stat -f%z "$path" 2>/dev/null || stat -c%s "$path")
    printf "    %s✓%s %s%s%s %s(%s bytes)%s\n" \
      "$__GREEN" "$__RESET" "$__CYAN" "$path" "$__RESET" \
      "$__DIM" "$bytes" "$__RESET"
    return 0
  fi
  _fail "expected file: $path"
}

# Assert a numeric value is within ±tolerance of expected.
expect_near() {
  local label="$1"
  local actual="$2"
  local target="$3"
  local tolerance="$4"

  local lo=$(( target - tolerance ))
  local hi=$(( target + tolerance ))
  if [ "$actual" -ge "$lo" ] && [ "$actual" -le "$hi" ]; then
    printf "    %s✓%s %s = %s%s%s %s(target %s ± %s)%s\n" \
      "$__GREEN" "$__RESET" "$label" "$__CYAN" "$actual" "$__RESET" \
      "$__DIM" "$target" "$tolerance" "$__RESET"
    return 0
  fi
  _fail "$label = $actual (target $target ± $tolerance)"
}

# Generic boolean assertion. Pass with a short failure message.
expect() {
  local label="$1"
  shift
  if "$@"; then
    printf "    %s✓%s %s\n" "$__GREEN" "$__RESET" "$label"
    return 0
  fi
  _fail "$label"
}

# Print final tally and exit with status.
summary() {
  if [ -n "$__STEP_NAME" ]; then
    _close_pass
  fi
  printf "\n%s%s%s\n" "$__DIM" "$(_rule)" "$__RESET"
  printf "%s ran %d, %s%d passed%s, %s%d failed%s\n" \
    "$__SUITE_NAME" \
    "$__STEP_INDEX" \
    "$__GREEN" "$__STEP_PASS" "$__RESET" \
    "$__RED" "$__STEP_FAIL" "$__RESET"
  if [ "$__STEP_FAIL" -gt 0 ]; then
    printf "\n%s✖ failures:%s\n" "$__RED" "$__RESET"
    for f in "${__FAILURES[@]}"; do
      printf "  %s•%s %s\n" "$__RED" "$__RESET" "$f"
    done
    exit 1
  fi
  exit 0
}

# ---- internals ----------------------------------------------------

_close_pass() {
  __STEP_PASS=$((__STEP_PASS + 1))
}

_fail() {
  local message="$1"
  printf "    %s✖%s %s\n" "$__RED" "$__RESET" "$message"
  __STEP_FAIL=$((__STEP_FAIL + 1))
  __FAILURES+=("[$__STEP_INDEX] $__STEP_NAME — $message")
  __STEP_NAME=""
  return 0
}

_rule() {
  printf '%.0s─' {1..40}
}
