#!/usr/bin/env bash
# trim: audio / video / image with extension routing.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

F=../seed-base/base
OUT=tmp/trim
mkdir -p "$OUT"
cp "$F/audio/piano.mp3" "$OUT/song.mp3"
cp "$F/video/cell.mp4"  "$OUT/clip.mp4"
cp "$F/image/fire.gif"  "$OUT/pic.gif"

suite "Trim"

step "audio slice 0–3s"
rm -f "$OUT/song.trim.mp3"
task trim "$OUT/song.mp3" -o "$OUT/song.trim.mp3" -s 0 -e 3 -f text >/dev/null 2>&1
expect_file "$OUT/song.trim.mp3"

step "video slice 0–2s"
rm -f "$OUT/clip.trim.mp4"
task trim "$OUT/clip.mp4" -o "$OUT/clip.trim.mp4" -s 0 -e 2 -f text >/dev/null 2>&1
expect_file "$OUT/clip.trim.mp4"

step "image crop 20x20"
rm -f "$OUT/pic.crop.gif"
task trim "$OUT/pic.gif" -o "$OUT/pic.crop.gif" -c 0,0,20,20 -f text >/dev/null 2>&1
expect_file "$OUT/pic.crop.gif"

summary
