#!/usr/bin/env bash
#
# `task pad` and `task set metadata` end-to-end. Fixtures copy in
# from `../seed-base/base/audio/`; outputs land in
# `tmp/audio/out/`.

set -euo pipefail
cd "$(dirname "$0")/.."
. test/lib.sh

FIXTURES=../seed-base/base/audio
SRC=tmp/audio
OUT=tmp/audio/out

mkdir -p "$SRC" "$OUT"
cp -n "$FIXTURES/piano.mp3"  "$SRC/piano.mp3"  2>/dev/null || true
cp -n "$FIXTURES/guitar.wav" "$SRC/guitar.wav" 2>/dev/null || true

LYRICS="$SRC/lyrics.txt"
[ -f "$LYRICS" ] || cat > "$LYRICS" <<'EOF'
[Verse 1]
test lyric line one
test lyric line two
EOF

duration_ms() {
  ffprobe -v quiet -select_streams a:0 \
    -show_entries stream=duration \
    -of default=noprint_wrappers=1:nokey=1 "$1" \
    | awk '{ printf "%.0f\n", $1 * 1000 }'
}

suite "Audio"

step "pad mp3 to 3:00.000"
PAD_OUT="$OUT/piano.padded.mp3"
rm -f "$PAD_OUT"
task pad -i "$SRC/piano.mp3" -o "$PAD_OUT" --to 3:00.000 -f text >/dev/null
expect_file "$PAD_OUT"
expect_near "duration_ms" "$(duration_ms "$PAD_OUT")" 180000 500

step "pad wav to 12.5 seconds (float-seconds target)"
PAD_WAV="$OUT/guitar.padded.wav"
rm -f "$PAD_WAV"
task pad -i "$SRC/guitar.wav" -o "$PAD_WAV" --to 12.5 -f text >/dev/null
expect_file "$PAD_WAV"

step "pad short-circuits when input already long enough"
PAD_NOOP="$OUT/piano.copy.mp3"
rm -f "$PAD_NOOP"
task pad -i "$SRC/piano.mp3" -o "$PAD_NOOP" --to 0:01.000 -f text >/dev/null
expect_file "$PAD_NOOP"

step "set metadata writes ID3 fields"
META_OUT="$OUT/piano.tagged.mp3"
cp "$SRC/piano.mp3" "$META_OUT"
task set metadata \
  -i "$META_OUT" -o "$META_OUT" \
  --title "Test Song" --artist "Test Artist" --album "Test Album" \
  --track "1/1" -f text >/dev/null
expect_file "$META_OUT"
expect "TIT2 frame written" \
  test -n "$(id3v2 -l "$META_OUT" | grep -E '^TIT2')"

step "set metadata embeds lyrics"
LYR_OUT="$OUT/piano.lyrics.mp3"
cp "$SRC/piano.mp3" "$LYR_OUT"
task set metadata \
  -i "$LYR_OUT" -o "$LYR_OUT" \
  --title "Lyric Test" --artist "Test" \
  --lyrics-file-path "$LYRICS" -f text >/dev/null
expect_file "$LYR_OUT"
expect "USLT (lyrics) frame present" \
  test "$(id3v2 -l "$LYR_OUT" | grep -c USLT)" -ge 1

summary
