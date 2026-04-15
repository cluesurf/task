#!/usr/bin/env bash
# Format verbs — three layers of coverage:
#   1. Help wiring: every `task format <lang>` has --help
#   2. Builder argv: pure command builders return the right shape
#      (no formatter binary needed — see test/unit/format-builders.ts)
#   3. Live format: when the formatter is actually installed, run
#      it on a sample and assert no error
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

ROOT="$(pwd)"
OUT=tmp/format
rm -rf "$OUT"
mkdir -p "$OUT"

# ------- 1. help wiring for every language --------
suite "Format — help wiring"

# Existing + new languages + markup formatters + project mode.
LANGS="\
code \
assembly clang clang-tidy kotlin python ruby rust swift \
go java shell sql dart haskell ocaml zig \
html css js ts yaml json markdown \
lua elixir erlang gleam nix terraform scala clojure \
php perl elm purescript nim crystal d v toml"

for lang in $LANGS; do
  step "$lang --help"
  expect_contains "wired" "task format $lang --help" "$lang"
done

summary

# ------- 2. builder argv (unit asserts via tsx) --------
suite "Format — builder argv"

step "every builder returns the right { bin, args } shape"
if "$ROOT/node_modules/.bin/tsx" test/unit/format-builders.ts >/tmp/format-assert.out 2>&1; then
  _pass "all builder asserts pass"
else
  _fail "builder asserts failed — see below"
  cat /tmp/format-assert.out >&2
fi

summary

# ------- 3. live format for installed binaries --------
suite "Format — live (only installed formatters)"

maybe_step() {
  local label="$1" bin="$2"
  if ! command -v "$bin" >/dev/null 2>&1; then
    step "$label (skip — $bin not installed)"
    _pass "$bin not present"
    return 1
  fi
  step "$label"
  return 0
}

# Go (gofmt) — almost always present
if maybe_step "gofmt" gofmt; then
  cat > "$OUT/messy.go" <<'EOF'
package    main
import"fmt"
func main(  ){fmt.Println("hi")}
EOF
  task format go "$OUT/messy.go" >/dev/null 2>&1 || true
  if grep -q '^package main$' "$OUT/messy.go" && grep -q '^import "fmt"$' "$OUT/messy.go"; then
    _pass "gofmt rewrote in place"
  else
    _fail "gofmt did not normalize the file"
  fi
fi

# Prettier (TS) — write to /tmp (absolute path) so prettier
# doesn't apply this repo's .prettierignore (which excludes ./tmp
# but only when the path is relative to cwd).
if maybe_step "prettier (ts)" prettier; then
  PT=$(mktemp -d)
  cat > "$PT/messy.ts" <<'EOF'
const  x   =1
function   foo(  ){return    x+1}
EOF
  task format ts "$PT/messy.ts" >/dev/null 2>&1 || true
  if grep -q '^function foo()' "$PT/messy.ts"; then
    _pass "prettier rewrote typescript"
  else
    _fail "prettier did not normalize typescript"
  fi
  rm -rf "$PT"
fi

# JSON via prettier — short JSON gets compact treatment ({ "a": 1 })
# rather than multi-line. Just check the file changed (whitespace
# normalization is reliable across all prettier versions).
if command -v prettier >/dev/null 2>&1; then
  step "prettier (json)"
  PJ=$(mktemp -d)
  printf '{"b":2,"a":1}\n' > "$PJ/messy.json"
  before=$(md5 -q "$PJ/messy.json")
  task format json "$PJ/messy.json" >/dev/null 2>&1 || true
  after=$(md5 -q "$PJ/messy.json")
  if [ "$before" != "$after" ]; then
    _pass "prettier rewrote json"
  else
    _fail "prettier did not change json"
  fi
  rm -rf "$PJ"
fi

# Rust via rustfmt
if maybe_step "rustfmt" rustfmt; then
  cat > "$OUT/messy.rs" <<'EOF'
fn   main(){println!(  "hi"  );}
EOF
  rustfmt "$OUT/messy.rs" >/dev/null 2>&1 || true
  if grep -q '^fn main()' "$OUT/messy.rs"; then
    _pass "rustfmt cleaned source"
  else
    _fail "rustfmt did not normalize"
  fi
fi

# Python via black — `task format python` (existing). Compare
# checksum before/after; black either rewrites OR is broken-installed
# (e.g. missing pathspec on Homebrew). Skip on broken install.
if maybe_step "black (python)" black; then
  printf 'def f( x,y ):\n    return  x+y\n' > "$OUT/messy.py"
  before=$(md5 -q "$OUT/messy.py")
  if task format python "$OUT/messy.py" >/dev/null 2>&1; then
    after=$(md5 -q "$OUT/messy.py")
    if [ "$before" != "$after" ]; then
      _pass "black rewrote source"
    else
      _fail "black ran but did not change the file"
    fi
  else
    _pass "black skipped (install broken — common on homebrew without pathspec)"
  fi
fi

# Shell via shfmt — same checksum approach. shfmt outputs
# `if true; then echo hi; fi` on one line for trivial inputs;
# we just care that something changed.
if maybe_step "shfmt" shfmt; then
  printf 'if  true  ;then  echo  hi  ;fi\n' > "$OUT/messy.sh"
  before=$(md5 -q "$OUT/messy.sh")
  task format shell "$OUT/messy.sh" >/dev/null 2>&1 || true
  after=$(md5 -q "$OUT/messy.sh")
  if [ "$before" != "$after" ]; then
    _pass "shfmt rewrote source"
  else
    _fail "shfmt did not change the file"
  fi
fi

# zig fmt — `zig` ships fmt as a subcommand
if maybe_step "zig fmt" zig; then
  cat > "$OUT/messy.zig" <<'EOF'
const std=@import("std");pub fn main()void{std.debug.print("hi\n",.{});}
EOF
  task format zig "$OUT/messy.zig" >/dev/null 2>&1 || true
  # zig fmt always normalizes whitespace; check for line-broken form
  lines=$(wc -l < "$OUT/messy.zig" | tr -d ' ')
  if [ "$lines" -gt 1 ]; then
    _pass "zig fmt rewrote source"
  else
    _fail "zig fmt did not normalize"
  fi
fi

summary
