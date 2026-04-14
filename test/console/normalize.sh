#!/usr/bin/env bash
#
# normalize audio via ffmpeg loudnorm.

set -euo pipefail
cd "$(dirname "$0")/../.."
. test/lib.sh

FIXTURES=../seed-base/base
OUT=tmp/normalize
mkdir -p "$OUT"

cp -n "$FIXTURES/audio/piano.mp3" "$OUT/piano.mp3" 2>/dev/null || true

suite "Normalize"

step "normalize audio — default target"
OUT_FILE="$OUT/piano.norm.mp3"
rm -f "$OUT_FILE"
task normalize "$OUT/piano.mp3" -o "$OUT_FILE" -f text >/dev/null
expect_file "$OUT_FILE"

summary
