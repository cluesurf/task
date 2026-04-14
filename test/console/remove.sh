#!/usr/bin/env bash
# remove metadata (audio / image) + remove audio track (video).
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

F=../seed-base/base
OUT=tmp/remove
mkdir -p "$OUT"
cp "$F/audio/piano.mp3"  "$OUT/song.mp3"
cp "$F/audio/guitar.wav" "$OUT/voice.wav"
cp "$F/image/fire.gif"   "$OUT/pic.gif"
cp "$F/video/cell.mp4"   "$OUT/clip.mp4"

suite "Remove"

step "metadata from mp3"
task remove metadata "$OUT/song.mp3" -f text >/dev/null 2>&1
expect_file "$OUT/song.mp3"

step "metadata from wav"
task remove metadata "$OUT/voice.wav" -f text >/dev/null 2>&1
expect_file "$OUT/voice.wav"

step "metadata from image"
task remove metadata "$OUT/pic.gif" -f text >/dev/null 2>&1
expect_file "$OUT/pic.gif"

step "audio track from video"
rm -f "$OUT/clip.silent.mp4"
task remove audio -i "$OUT/clip.mp4" -o "$OUT/clip.silent.mp4" -f text >/dev/null 2>&1
expect_file "$OUT/clip.silent.mp4"

summary
