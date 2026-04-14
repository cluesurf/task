#!/usr/bin/env bash
#
# remove metadata (audio mp3/wav + image + video audio strip).

set -euo pipefail
cd "$(dirname "$0")/../.."
. test/lib.sh

FIXTURES=../seed-base/base
OUT=tmp/remove
mkdir -p "$OUT"

cp "$FIXTURES/audio/piano.mp3" "$OUT/piano.mp3"
cp "$FIXTURES/audio/guitar.wav" "$OUT/guitar.wav"
cp "$FIXTURES/image/fire.gif" "$OUT/fire.gif"
cp "$FIXTURES/video/cell.mp4" "$OUT/cell.mp4"

suite "Remove"

step "remove metadata — mp3 via ffmpeg routing"
task remove metadata "$OUT/piano.mp3" -f text >/dev/null
expect_file "$OUT/piano.mp3"

step "remove metadata — wav via ffmpeg routing"
task remove metadata "$OUT/guitar.wav" -f text >/dev/null
expect_file "$OUT/guitar.wav"

step "remove metadata — image via exiftool"
task remove metadata "$OUT/fire.gif" -f text >/dev/null
expect_file "$OUT/fire.gif"

step "remove audio — strip audio track from video"
OUT_SILENT="$OUT/cell.silent.mp4"
rm -f "$OUT_SILENT"
task remove audio -i "$OUT/cell.mp4" -o "$OUT_SILENT" -f text >/dev/null
expect_file "$OUT_SILENT"

summary
