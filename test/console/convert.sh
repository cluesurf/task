#!/usr/bin/env bash
# convert: audio + image (single-frame fixture to avoid multi-frame
# expansion from GIF inputs).
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

F=../seed-base/base
OUT=tmp/convert
mkdir -p "$OUT"
cp "$F/audio/guitar.wav"    "$OUT/src.wav"
cp "$F/image/landscape.jpg" "$OUT/src.jpg"

suite "Convert"

step "audio wav → mp3"
rm -f "$OUT/out.mp3"
task convert "$OUT/src.wav" -o "$OUT/out.mp3" -f text >/dev/null 2>&1
expect_file "$OUT/out.mp3"

step "image jpg → png"
rm -f "$OUT/out.png"
task convert image -I jpg -O png -i "$OUT/src.jpg" -o "$OUT/out.png" -f text >/dev/null 2>&1
expect_file "$OUT/out.png"

summary
