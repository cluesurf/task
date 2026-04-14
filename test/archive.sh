#!/usr/bin/env bash
#
# Exercises the archive backends end-to-end against real fixtures.
# Fixtures copy-in from `../seed-base/base/archive/`; outputs land
# in `tmp/archive/out/`. Each command runs the CLI which parses
# input, routes to the right tool, and shells out.

set -eu
cd "$(dirname "$0")/.."

FIXTURES=../seed-base/base/archive
SRC=tmp/archive/zip
OUT=tmp/archive/out

task() {
  pnpm --silent tsx code/console.ts "$@"
}

log() {
  printf "\033[0;90m* %s\033[0m\n" "$*"
}

mkdir -p tmp/archive "$OUT"
if [ ! -d "$SRC" ]; then
  log "seeding tmp/archive/ from $FIXTURES"
  cp -R "$FIXTURES"/* tmp/archive/
fi

run() {
  local format="$1"
  local ext="$2"
  local tool="${3:-}"
  local out="$OUT/zip.$ext"
  rm -f "$out"
  local cmd="archive --input-path $SRC --output-format $format --output-file-path $out"
  if [ -n "$tool" ]; then
    cmd+=" --tool $tool"
  fi
  log "$cmd"
  task $cmd
  if [ -f "$out" ]; then
    printf "    -> %s (%s bytes)\n" "$out" "$(stat -f%z "$out" 2>/dev/null || stat -c%s "$out")"
  else
    printf "    !! expected output %s missing\n" "$out"
    exit 1
  fi
}

run zip zip
run 7z 7z
run tar tar
run tar.gz tar.gz
run tar.bz2 tar.bz2
run tar.xz tar.xz
run zip via-7z.zip 7z

if command -v atool >/dev/null 2>&1; then
  run tar.gz via-atool.tar.gz atool
fi

if command -v patool >/dev/null 2>&1; then
  run tar.gz via-patool.tar.gz patool
fi

log "all archive backends produced output"
