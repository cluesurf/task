#!/usr/bin/env bash
#
# rotate image / video + flip image.

set -euo pipefail
cd "$(dirname "$0")/../.."
. test/lib.sh

FIXTURES=../seed-base/base
OUT=tmp/rotate-flip
mkdir -p "$OUT"

cp -n "$FIXTURES/image/fire.gif" "$OUT/fire.gif" 2>/dev/null || true
cp -n "$FIXTURES/video/cell.mp4" "$OUT/cell.mp4" 2>/dev/null || true

suite "Rotate / Flip"

step "rotate image 90°"
OUT_IMG="$OUT/fire.rot.gif"
rm -f "$OUT_IMG"
task rotate "$OUT/fire.gif" -o "$OUT_IMG" -d 90 -f text >/dev/null
expect_file "$OUT_IMG"

step "rotate video 90°"
OUT_VID="$OUT/cell.rot.mp4"
rm -f "$OUT_VID"
task rotate "$OUT/cell.mp4" -o "$OUT_VID" -d 90 -f text >/dev/null
expect_file "$OUT_VID"

step "flip image horizontally"
OUT_FLIP="$OUT/fire.flip.gif"
rm -f "$OUT_FLIP"
task flip "$OUT/fire.gif" -o "$OUT_FLIP" --horizontal -f text >/dev/null
expect_file "$OUT_FLIP"

summary
