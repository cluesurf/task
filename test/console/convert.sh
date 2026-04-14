#!/usr/bin/env bash
# convert: audio + image (the two common pairs).
set -euo pipefail
cd "$(dirname "$0")/../.."
. test/lib.sh

F=../seed-base/base
OUT=tmp/convert
mkdir -p "$OUT"
cp "$F/audio/guitar.wav" "$OUT/src.wav"
cp "$F/image/fire.gif"   "$OUT/src.gif"

suite "Convert"

step "audio wav → mp3"
rm -f "$OUT/out.mp3"
task convert "$OUT/src.wav" -o "$OUT/out.mp3" -f text >/dev/null
expect_file "$OUT/out.mp3"

step "image gif → png"
rm -f "$OUT/out.png"
task convert image -I gif -O png -i "$OUT/src.gif" -o "$OUT/out.png" -f text >/dev/null
expect_file "$OUT/out.png"

summary
