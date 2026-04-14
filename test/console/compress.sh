#!/usr/bin/env bash
# compress: font / audio / image / video via extension routing.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

F=../seed-base/base
OUT=tmp/compress
mkdir -p "$OUT"
cp "$F/font/etch.ttf"     "$OUT/fnt.ttf"
cp "$F/audio/piano.mp3"      "$OUT/song.mp3"
cp "$F/image/landscape.jpg"  "$OUT/pic.jpg"
cp "$F/video/cell.mp4"       "$OUT/clip.mp4"

suite "Compress"

step "font → woff2"
rm -f "$OUT/fnt.woff2"
task compress "$OUT/fnt.ttf" -f text >/dev/null 2>&1
expect_file "$OUT/fnt.woff2"

step "audio bitrate"
rm -f "$OUT/song.96k.mp3"
task compress "$OUT/song.mp3" -o "$OUT/song.96k.mp3" -b 96k -f text >/dev/null 2>&1
expect_file "$OUT/song.96k.mp3"

step "image quality"
rm -f "$OUT/pic.small.jpg"
task compress "$OUT/pic.jpg" -o "$OUT/pic.small.jpg" -q 50 -f text >/dev/null 2>&1
expect_file "$OUT/pic.small.jpg"

step "video crf"
rm -f "$OUT/clip.small.mp4"
task compress "$OUT/clip.mp4" -o "$OUT/clip.small.mp4" --crf 32 -f text >/dev/null 2>&1
expect_file "$OUT/clip.small.mp4"

summary
