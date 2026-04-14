#!/usr/bin/env bash
# resize video.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

F=../seed-base/base
OUT=tmp/resize
mkdir -p "$OUT"
cp "$F/video/cell.mp4" "$OUT/clip.mp4"

suite "Resize"

step "video width 320 (-w)"
rm -f "$OUT/clip.320.mp4"
task resize "$OUT/clip.mp4" -o "$OUT/clip.320.mp4" -w 320 -f text >/dev/null 2>&1
expect_file "$OUT/clip.320.mp4"

step "video 320x180 (-w --height)"
rm -f "$OUT/clip.thumb.mp4"
# `-h` is the global help short flag, so `--height` is required for
# the explicit second-dimension form.
task resize "$OUT/clip.mp4" -o "$OUT/clip.thumb.mp4" -w 320 --height 180 -f text >/dev/null 2>&1
expect_file "$OUT/clip.thumb.mp4"

summary
