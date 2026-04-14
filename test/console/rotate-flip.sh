#!/usr/bin/env bash
# rotate image / video + flip image.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

F=../seed-base/base
OUT=tmp/rotate-flip
mkdir -p "$OUT"
cp "$F/image/fire.gif" "$OUT/pic.gif"
cp "$F/video/cell.mp4" "$OUT/clip.mp4"

suite "Rotate / Flip"

step "rotate image 90°"
rm -f "$OUT/pic.rot.gif"
task rotate "$OUT/pic.gif" -o "$OUT/pic.rot.gif" -d 90 -f text >/dev/null 2>&1
expect_file "$OUT/pic.rot.gif"

step "rotate video 90°"
rm -f "$OUT/clip.rot.mp4"
task rotate "$OUT/clip.mp4" -o "$OUT/clip.rot.mp4" -d 90 -f text >/dev/null 2>&1
expect_file "$OUT/clip.rot.mp4"

step "flip image horizontally"
rm -f "$OUT/pic.flip.gif"
task flip "$OUT/pic.gif" -o "$OUT/pic.flip.gif" --horizontal -f text >/dev/null 2>&1
expect_file "$OUT/pic.flip.gif"

summary
