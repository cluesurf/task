#!/usr/bin/env bash
# compress: font / audio / image / video.
set -euo pipefail
cd "$(dirname "$0")/../.."
. test/lib.sh

F=../seed-base/base
OUT=tmp/compress
mkdir -p "$OUT"
cp "$F/font/ancient.ttf" "$OUT/fnt.ttf"
cp "$F/audio/piano.mp3"  "$OUT/song.mp3"
cp "$F/image/fire.gif"   "$OUT/pic.gif"
cp "$F/video/cell.mp4"   "$OUT/clip.mp4"

suite "Compress"

step "font → woff2"
rm -f "$OUT/fnt.woff2"
task compress "$OUT/fnt.ttf" -f text >/dev/null
expect_file "$OUT/fnt.woff2"

step "audio bitrate"
rm -f "$OUT/song.96k.mp3"
task compress "$OUT/song.mp3" -o "$OUT/song.96k.mp3" -b 96k -f text >/dev/null
expect_file "$OUT/song.96k.mp3"

step "image quality"
rm -f "$OUT/pic.jpg"
task compress "$OUT/pic.gif" -o "$OUT/pic.jpg" -q 50 -f text >/dev/null
expect_file "$OUT/pic.jpg"

step "video crf"
rm -f "$OUT/clip.small.mp4"
task compress "$OUT/clip.mp4" -o "$OUT/clip.small.mp4" --crf 32 -f text >/dev/null
expect_file "$OUT/clip.small.mp4"

summary
