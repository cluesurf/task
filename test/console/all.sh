#!/usr/bin/env bash
#
# Run every console CLI suite in sequence. Each suite exits
# non-zero on failure, so `set -e` bubbles up the first miss.

set -e
DIR="$(dirname "$0")"
for suite in "$DIR"/*.sh; do
  [ "$suite" = "$DIR/all.sh" ] && continue
  bash "$suite"
done
