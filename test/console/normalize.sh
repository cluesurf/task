#!/usr/bin/env bash
# normalize audio via ffmpeg loudnorm.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

F=../seed-base/base
OUT=tmp/normalize
mkdir -p "$OUT"
cp "$F/audio/piano.mp3" "$OUT/song.mp3"

suite "Normalize"

step "audio"
rm -f "$OUT/song.norm.mp3"
task normalize "$OUT/song.mp3" -o "$OUT/song.norm.mp3" -f text >/dev/null 2>&1
expect_file "$OUT/song.norm.mp3"

summary
