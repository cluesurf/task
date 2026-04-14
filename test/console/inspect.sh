#!/usr/bin/env bash
#
# inspect across file kinds (pdf, image, audio, video, font, text)
# — each runs through its custom extractor.

set -euo pipefail
cd "$(dirname "$0")/../.."
. test/lib.sh

FIXTURES=../seed-base/base
OUT=tmp/inspect
mkdir -p "$OUT"

cp -n "$FIXTURES/document/error.pdf" "$OUT/doc.pdf"   2>/dev/null || true
cp -n "$FIXTURES/image/fire.gif"     "$OUT/fire.gif"  2>/dev/null || true
cp -n "$FIXTURES/audio/piano.mp3"    "$OUT/piano.mp3" 2>/dev/null || true
cp -n "$FIXTURES/video/cell.mp4"     "$OUT/cell.mp4"  2>/dev/null || true
cp -n "$FIXTURES/font/etch.ttf"      "$OUT/etch.ttf"  2>/dev/null || true
printf 'hello\nworld\n' > "$OUT/plain.txt"

suite "Inspect"

step "pdf — shows 'pages' row"
OUTPUT=$(task inspect "$OUT/doc.pdf" -f text 2>&1)
expect "contains pages" test -n "$(echo "$OUTPUT" | grep -E '^pages ')"

step "image — shows dimensions"
OUTPUT=$(task inspect "$OUT/fire.gif" -f text 2>&1)
expect "has dimensions" test -n "$(echo "$OUTPUT" | grep -i dimensions)"

step "audio — shows codec or duration"
OUTPUT=$(task inspect "$OUT/piano.mp3" -f text 2>&1)
expect "has codec or duration" test -n "$(echo "$OUTPUT" | grep -iE 'codec|duration')"

step "video — shows dimensions"
OUTPUT=$(task inspect "$OUT/cell.mp4" -f text 2>&1)
expect "has dimensions" test -n "$(echo "$OUTPUT" | grep -i dimensions)"

step "font — shows family + tables"
OUTPUT=$(task inspect "$OUT/etch.ttf" -f text 2>&1)
expect "has family" test -n "$(echo "$OUTPUT" | grep -i family)"
expect "has tables" test -n "$(echo "$OUTPUT" | grep -i tables)"

step "text — shows mime + eol + encoding"
OUTPUT=$(task inspect "$OUT/plain.txt" -f text 2>&1)
expect "has mime" test -n "$(echo "$OUTPUT" | grep 'text/plain')"
expect "has eol lf" test -n "$(echo "$OUTPUT" | grep -E '^eol +lf$')"

summary
