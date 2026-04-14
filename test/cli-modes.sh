#!/usr/bin/env bash
#
# Exercises the dual input/output invocation modes across every
# command type that exposes `input.file.path` + `output.file.path`:
#
#   1. Positional in-place: `task <verb> <path> [options]`
#      → input + output both default to <path>; the file is
#        edited in place.
#   2. Explicit: `task <verb> -i <in> -o <out> [options]`
#      → separate paths; original input untouched.
#   3. Same-path explicit: `task <verb> -i <p> -o <p> [options]`
#      → equivalent to (1); the handler routes through a tmp
#        file and atomically renames.
#   4. Missing both → friendly error.
#
# Fixtures copy in from `../seed-base/base/`; outputs live in
# `tmp/cli-modes/`.

set -euo pipefail
cd "$(dirname "$0")/.."
. test/lib.sh

FIXTURES=../seed-base/base
SRC=tmp/cli-modes
OUT=tmp/cli-modes/out

mkdir -p "$SRC" "$OUT"

cp -n "$FIXTURES/audio/piano.mp3" "$SRC/piano.mp3"   2>/dev/null || true
cp -n "$FIXTURES/image/fire.png"  "$SRC/fire.png"    2>/dev/null || true
cp -n "$FIXTURES/font/etch.ttf"   "$SRC/etch.ttf"    2>/dev/null || true

[ "${KEEP:-}" = "1" ] || find "$OUT" -mindepth 1 -delete 2>/dev/null || true

# `expect_succeeds <label> <bash command...>` — runs the command
# silently; passes if exit code is 0, fails otherwise.
expect_succeeds() {
  local label="$1"; shift
  if "$@" >/dev/null 2>&1; then
    printf "    %s✓%s %s\n" "$__GREEN" "$__RESET" "$label"
  else
    _fail "$label (exit $?)"
  fi
}

# `expect_fails <label> <bash command...>` — opposite.
expect_fails() {
  local label="$1"; shift
  if "$@" >/dev/null 2>&1; then
    _fail "$label (expected non-zero exit, got 0)"
  else
    printf "    %s✓%s %s\n" "$__GREEN" "$__RESET" "$label"
  fi
}

# `expect_stderr_contains <label> <needle> <command...>` — runs
# the command capturing stderr; passes when stderr contains the
# needle.
expect_stderr_contains() {
  local label="$1"; shift
  local needle="$1"; shift
  local stderr
  stderr=$("$@" 2>&1 1>/dev/null || true)
  if printf '%s' "$stderr" | grep -qF "$needle"; then
    printf "    %s✓%s %s\n" "$__GREEN" "$__RESET" "$label"
  else
    _fail "$label — stderr did not contain \"$needle\""
    note "stderr was: $stderr"
  fi
}

suite "CLI input/output modes"

# ---- positional in-place ------------------------------------------

step "task pad <file> edits the audio file in place"
TARGET="$OUT/piano.inplace.mp3"
cp "$SRC/piano.mp3" "$TARGET"
ORIG_BYTES=$(stat -f%z "$TARGET" 2>/dev/null || stat -c%s "$TARGET")
expect_succeeds "task pad <file>" \
  task pad "$TARGET" --to 0:05.000 -f text
expect_file "$TARGET"
NEW_BYTES=$(stat -f%z "$TARGET" 2>/dev/null || stat -c%s "$TARGET")
expect "file grew (was $ORIG_BYTES, now $NEW_BYTES)" \
  test "$NEW_BYTES" -gt "$ORIG_BYTES"

step "task set metadata <file> writes ID3 in place"
TARGET="$OUT/piano.tagged.mp3"
cp "$SRC/piano.mp3" "$TARGET"
expect_succeeds "task set metadata <file>" \
  task set metadata "$TARGET" --title "Inplace Test" -f text
expect "TIT2 frame written" \
  test -n "$(id3v2 -l "$TARGET" | grep -E '^TIT2')"

step "task convert image <file> converts in place using --output-format"
TARGET="$OUT/fire.inplace.png"
cp "$SRC/fire.png" "$TARGET"
expect_succeeds "task convert image <file>" \
  task convert image -I png -O jpg "$TARGET" -f text

# ---- explicit -i/-o ----------------------------------------------

step "task pad -i in -o out keeps input untouched"
INPUT="$SRC/piano.mp3"
OUTPUT="$OUT/piano.explicit.mp3"
INPUT_BYTES=$(stat -f%z "$INPUT" 2>/dev/null || stat -c%s "$INPUT")
expect_succeeds "task pad -i ... -o ..." \
  task pad -i "$INPUT" -o "$OUTPUT" --to 0:05.000 -f text
expect_file "$OUTPUT"
expect "input bytes unchanged ($INPUT_BYTES)" \
  test "$(stat -f%z "$INPUT" 2>/dev/null || stat -c%s "$INPUT")" -eq "$INPUT_BYTES"

step "task convert image -i in -o out with separate paths"
expect_succeeds "task convert image -i ... -o ..." \
  task convert image -I png -O webp \
    -i "$SRC/fire.png" -o "$OUT/fire.explicit.webp" -f text
expect_file "$OUT/fire.explicit.webp"

step "task convert font -i in -o out (no positional needed)"
expect_succeeds "task convert font -i ... -o ..." \
  task convert font -I ttf -O woff \
    -i "$SRC/etch.ttf" -o "$OUT/etch.woff" -f text
expect_file "$OUT/etch.woff"

# ---- same-path explicit (-i p -o p) ------------------------------

step "task set metadata -i p -o p (same path) edits in place"
TARGET="$OUT/piano.same-path.mp3"
cp "$SRC/piano.mp3" "$TARGET"
expect_succeeds "task set metadata -i p -o p" \
  task set metadata -i "$TARGET" -o "$TARGET" --title "Same Path" -f text
expect "TIT2 frame written" \
  test -n "$(id3v2 -l "$TARGET" | grep -E '^TIT2')"

step "task pad -i p -o p (same path) edits in place"
TARGET="$OUT/piano.same-path-pad.mp3"
cp "$SRC/piano.mp3" "$TARGET"
ORIG_BYTES=$(stat -f%z "$TARGET" 2>/dev/null || stat -c%s "$TARGET")
expect_succeeds "task pad -i p -o p" \
  task pad -i "$TARGET" -o "$TARGET" --to 0:05.000 -f text
expect "file grew" \
  test "$(stat -f%z "$TARGET" 2>/dev/null || stat -c%s "$TARGET")" -gt "$ORIG_BYTES"

# ---- missing input/output -----------------------------------------

step "task pad with neither positional nor -i/-o errors clearly"
expect_fails "task pad --to 0:05.000 (no path)" \
  task pad --to 0:05.000 -f text
expect_stderr_contains "stderr names the missing flags" \
  "Missing input/output" \
  task pad --to 0:05.000 -f text

step "task convert image without paths errors clearly"
expect_fails "task convert image -I png -O jpg (no path)" \
  task convert image -I png -O jpg -f text
expect_stderr_contains "stderr names the missing flags" \
  "Missing input/output" \
  task convert image -I png -O jpg -f text

# ---- mixing positional + -i should be rejected --------------------

step "task pad <file> with extra -i is rejected"
# yargs sees an unknown argv pattern + the positional is taken; we
# expect a non-zero exit (yargs strict mode).
expect_fails "task pad <file> + -i <other>" \
  task pad "$OUT/piano.inplace.mp3" -i other.mp3 --to 0:05.000 -f text

summary
