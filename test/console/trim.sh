#!/usr/bin/env bash
#
# trim audio / video / image — and the implicit-routing form
# `task trim <file> ...` that picks the subcommand from the
# extension.

set -euo pipefail
cd "$(dirname "$0")/../.."
. test/lib.sh

FIXTURES=../seed-base/base
OUT=tmp/trim
mkdir -p "$OUT"

cp -n "$FIXTURES/audio/piano.mp3" "$OUT/piano.mp3" 2>/dev/null || true
cp -n "$FIXTURES/video/cell.mp4"  "$OUT/cell.mp4"  2>/dev/null || true
cp -n "$FIXTURES/image/fire.gif"  "$OUT/fire.gif"  2>/dev/null || true

file_size() { stat -f%z "$1" 2>/dev/null || stat -c%s "$1"; }

suite "Trim"

step "trim audio — 0–3s slice with short flags"
OUT_AUDIO="$OUT/piano.trim.mp3"
rm -f "$OUT_AUDIO"
task trim "$OUT/piano.mp3" -o "$OUT_AUDIO" -s 0 -e 3 -f text >/dev/null
expect_file "$OUT_AUDIO"
expect "smaller than original" test "$(file_size "$OUT_AUDIO")" -lt "$(file_size "$OUT/piano.mp3")"

step "trim video — 0–2s slice (stream copy)"
OUT_VIDEO="$OUT/cell.trim.mp4"
rm -f "$OUT_VIDEO"
task trim "$OUT/cell.mp4" -o "$OUT_VIDEO" --start 0 --end 2 -f text >/dev/null
expect_file "$OUT_VIDEO"

step "trim image — 20x20 crop at (0,0)"
OUT_IMG="$OUT/fire.crop.gif"
rm -f "$OUT_IMG"
task trim "$OUT/fire.gif" -o "$OUT_IMG" -c 0,0,20,20 -f text >/dev/null
expect_file "$OUT_IMG"

summary
