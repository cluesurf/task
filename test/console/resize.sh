#!/usr/bin/env bash
#
# resize image / video.

set -euo pipefail
cd "$(dirname "$0")/../.."
. test/lib.sh

FIXTURES=../seed-base/base
OUT=tmp/resize
mkdir -p "$OUT"

cp -n "$FIXTURES/image/fire.gif" "$OUT/fire.gif" 2>/dev/null || true
cp -n "$FIXTURES/video/cell.mp4" "$OUT/cell.mp4" 2>/dev/null || true

suite "Resize"

step "resize video — width 320 with short flag"
OUT_VID="$OUT/cell.320.mp4"
rm -f "$OUT_VID"
task resize "$OUT/cell.mp4" -o "$OUT_VID" -w 320 -f text >/dev/null
expect_file "$OUT_VID"

step "resize video — 320x180 with -w / -h"
OUT_VID2="$OUT/cell.thumb.mp4"
rm -f "$OUT_VID2"
task resize "$OUT/cell.mp4" -o "$OUT_VID2" -w 320 -h 180 -f text >/dev/null
expect_file "$OUT_VID2"

summary
