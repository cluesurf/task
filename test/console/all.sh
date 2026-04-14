#!/usr/bin/env bash
#
# Run every console CLI suite and summarize at the end. Suites
# are independent — one failure doesn't halt the others so the
# final report shows everything broken in one run.

DIR="$(dirname "$0")"
fail=0
for suite in "$DIR"/*.sh; do
  [ "$suite" = "$DIR/all.sh" ] && continue
  bash "$suite" || fail=$((fail + 1))
done

if [ "$fail" -gt 0 ]; then
  printf '\n✖ %d suite(s) failed\n' "$fail"
  exit 1
fi
printf '\n✓ all suites passed\n'
