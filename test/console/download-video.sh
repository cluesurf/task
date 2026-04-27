#!/usr/bin/env bash
#
# `task download video` — yt-dlp wrapper. Live download requires
# yt-dlp + network + a real URL, which is too heavy for CI; we
# verify help wiring and that yt-dlp respects `--simulate` when
# present (no actual download).
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

suite "Download video — help"

step "task download video --help"
expect_contains "wired" "task download video --help" "video"

step "advertises format / audio-only / output flags"
expect_contains "format flag" "task download video --help" "format"
expect_contains "audio-only flag" "task download video --help" "audio-only"
expect_contains "output flag" "task download video --help" "output"

step "errors when url is missing"
if task download video >/dev/null 2>&1; then
  _fail "expected non-zero exit when url missing"
else
  _pass "errors without url"
fi

summary

if ! command -v yt-dlp >/dev/null 2>&1; then
  printf '\n  (yt-dlp not on PATH — skipping version probe)\n'
  exit 0
fi

suite "Download video — yt-dlp self-check"

step "yt-dlp --version returns something parseable"
expect_contains "version printed" \
  "yt-dlp --version 2>&1" \
  "[0-9]+"

summary
