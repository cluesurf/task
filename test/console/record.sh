#!/usr/bin/env bash
# `task record` / `task replay` / `task list window`.
# Three layers:
#   1. Help wiring + flag presence.
#   2. Unit asserts on the pure builders + planner +
#      autoplay-html template (test/unit/record-builders.ts).
#   3. End-to-end replay → html, which is the only path that
#      doesn't shell out to ffmpeg/agg/asciinema. The other
#      record / replay paths are skipped when the binaries
#      aren't on PATH.

cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

ROOT="$(pwd)"
OUT="$ROOT/tmp/record-test"
rm -rf "$OUT"
mkdir -p "$OUT"

# ── 1. help wiring ────────────────────────────────────────────
suite "record / replay — help wiring"

step "task record --help mentions screen / window / terminal"
expect_contains "screen"   "task record --help" "screen"
expect_contains "window"   "task record --help" "window"
expect_contains "terminal" "task record --help" "terminal"

step "task record screen --help"
expect_contains "screen out"   "task record screen --help"   "output"
expect_contains "screen rate"  "task record screen --help"   "framerate"
expect_contains "screen dur"   "task record screen --help"   "duration"

step "task record window --help mentions list window"
expect_contains "window out"   "task record window --help"   "output"
expect_contains "window list"  "task record window --help"   "list window"

step "task record terminal --help mentions html"
expect_contains "term out"     "task record terminal --help" "output"
expect_contains "term html"    "task record terminal --help" "html"
expect_contains "term idle"    "task record terminal --help" "idle-limit"

step "task replay --help"
expect_contains "replay gif"   "task replay --help" "gif"
expect_contains "replay mp4"   "task replay --help" "mp4"
expect_contains "replay html"  "task replay --help" "html"
expect_contains "replay speed" "task replay --help" "speed"

step "task list window --help"
expect_contains "list win desc" "task list window --help" "windows"
expect_contains "list win json" "task list window --help" "json"

summary

# ── 2. builder argv (unit asserts via tsx) ────────────────────
suite "record / replay — builder argv"

step "every builder + planner returns the expected shape"
if "$ROOT/node_modules/.bin/tsx" test/unit/record-builders.ts >/tmp/record-asserts.out 2>&1; then
  _pass "all builder asserts pass"
else
  _fail "$(cat /tmp/record-asserts.out | tail -30)"
fi

summary

# ── 3. replay → html end-to-end (no native deps) ──────────────
suite "replay — html embed end-to-end"

CAST="$OUT/demo.cast"
HTML="$OUT/demo.html"

# Minimal valid asciinema v2 cast: header line + a couple of
# events. The replay --html path doesn't actually need the
# events to be valid — it just embeds the cast URL in HTML —
# but we write a real one so the file is meaningful if anyone
# opens it.
cat > "$CAST" <<'EOF'
{"version":2,"width":80,"height":24,"timestamp":1700000000,"title":"Demo"}
[0.1,"o","hello\r\n"]
[0.5,"o","world\r\n"]
EOF

step "task replay <cast> -o <html> writes a self-contained page"
out=$(task replay "$CAST" -o "$HTML" 2>&1)
expect_file "$HTML"
expect_contains "html mentions player" "cat '$HTML'" "asciinema-player"
expect_contains "html references cast" "cat '$HTML'" "demo.cast"
expect_contains "html autoplay enabled" "cat '$HTML'" "autoPlay: true"

step "task replay --format html"
HTML2="$OUT/demo2.html"
task replay "$CAST" -o "$HTML2" --format html >/dev/null 2>&1
expect_file "$HTML2"

summary

# ── 4. record terminal --html sidecar (no asciinema needed) ───
# We can't actually run `asciinema rec` in a headless test, so
# just verify the help flag wiring and the renderer output.
suite "record terminal — html template renderer"

step "renderer escapes script tags in titles"
out=$("$ROOT/node_modules/.bin/tsx" -e "
import { renderAsciinemaHtml } from '~/code/tool/shared/record/command'
const h = renderAsciinemaHtml({ castUrl: 'd.cast', title: '<script>x</script>' })
process.stdout.write(h.includes('&lt;script&gt;') && !h.includes('<script>x</script>') ? 'ok\n' : 'BAD\n')
" 2>&1)
expect_eq "no inline <script>" "$out" "ok"

summary

# ── 5. list window — at least doesn't crash on this OS ────────
suite "list window — runs without crashing"

step "task list window --help"
expect_contains "list win help" "task list window --help" "windows"

step "task list window --json (best-effort)"
# This may fail on CI (headless macOS without Accessibility,
# Wayland on Linux, no GUI on Windows server) — accept success
# OR a clear "unsupported / not installed" error.
out=$(task list window --json 2>&1 || true)
if printf '%s' "$out" | grep -Eq '^\[' \
   || printf '%s' "$out" | grep -Eq 'unsupported|wmctrl|Wayland|powershell|not found|System Events'; then
  _pass "list window returned data or a clean unsupported-platform error"
else
  _fail "list window: unexpected output: $out"
fi

summary
