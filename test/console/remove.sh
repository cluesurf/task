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

step "subtitles from video"
rm -f "$OUT/clip.nosub.mp4"
task remove subtitles "$OUT/clip.mp4" -o "$OUT/clip.nosub.mp4" -f text >/dev/null 2>&1
expect_file "$OUT/clip.nosub.mp4"

step "transparency flatten"
cp "$F/image/landscape.jpg" "$OUT/flat.jpg"
task remove transparency "$OUT/flat.jpg" -o "$OUT/flat.noalpha.jpg" -f text >/dev/null 2>&1
expect_file "$OUT/flat.noalpha.jpg"

step "profile strip"
cp "$F/image/landscape.jpg" "$OUT/pro.jpg"
task remove profile "$OUT/pro.jpg" -o "$OUT/pro.noicc.jpg" -f text >/dev/null 2>&1
expect_file "$OUT/pro.noicc.jpg"

step "exif surgical preset"
cp "$F/image/landscape.jpg" "$OUT/exif.jpg"
task remove exif "$OUT/exif.jpg" -o "$OUT/exif.clean.jpg" --preset gps -f text >/dev/null 2>&1
expect_file "$OUT/exif.clean.jpg"

step "exif requires at least one tag / preset"
expect_contains "error mentions --tag or --preset" \
  "task remove exif $OUT/exif.jpg 2>&1 || true" \
  "at least one"

step "password help"
expect_contains "password description" "task remove password --help" "password"

summary
