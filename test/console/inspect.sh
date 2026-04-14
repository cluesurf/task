#!/usr/bin/env bash
# inspect across every file kind.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

F=../seed-base/base
OUT=tmp/inspect
mkdir -p "$OUT"
cp "$F/document/error.pdf" "$OUT/doc.pdf"
cp "$F/image/fire.gif"     "$OUT/pic.gif"
cp "$F/audio/piano.mp3"    "$OUT/song.mp3"
cp "$F/video/cell.mp4"     "$OUT/clip.mp4"
cp "$F/font/ancient.ttf"   "$OUT/fnt.ttf"
printf 'hello\nworld\n' > "$OUT/plain.txt"

suite "Inspect"

step "pdf"
expect_contains "pages row" "task inspect $OUT/doc.pdf -f text" "^pages "

step "image"
expect_contains "dimensions" "task inspect $OUT/pic.gif -f text" "dimensions"

step "audio"
expect_contains "codec or duration" "task inspect $OUT/song.mp3 -f text" "codec|duration"

step "video"
expect_contains "dimensions" "task inspect $OUT/clip.mp4 -f text" "dimensions"

step "font"
expect_contains "family + tables" "task inspect $OUT/fnt.ttf -f text" "family"

step "text"
expect_contains "text/plain" "task inspect $OUT/plain.txt -f text" "text/plain"
expect_contains "eol lf" "task inspect $OUT/plain.txt -f text" "^eol +lf$"

summary
