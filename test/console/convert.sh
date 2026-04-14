#!/usr/bin/env bash
# convert: audio + image.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

F=../seed-base/base
OUT=tmp/convert
mkdir -p "$OUT"
cp "$F/audio/guitar.wav" "$OUT/src.wav"
cp "$F/image/fire.gif"   "$OUT/src.gif"

suite "Convert"

step "audio wav → mp3"
rm -f "$OUT/out.mp3"
task convert "$OUT/src.wav" -o "$OUT/out.mp3" -f text >/dev/null 2>&1
expect_file "$OUT/out.mp3"

step "image gif → png"
rm -f "$OUT/out.png"
task convert image -I gif -O png -i "$OUT/src.gif" -o "$OUT/out.png" -f text >/dev/null 2>&1
expect_file "$OUT/out.png"

summary
