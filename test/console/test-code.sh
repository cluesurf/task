#!/usr/bin/env bash
# `task test code` — unified driver across jest, vitest,
# mocha, pytest, cargo test, go test, swift test, xctest,
# rspec, phpunit. Three layers of coverage:
#   1. Help wiring + --runner choices on the console.
#   2. Builder argv: every runner produces the right command
#      from the unified flags (see test/unit/test-runner-builders.ts).
#   3. Auto-detection: drop a marker file in a tmp project,
#      run with --dry-run, assert the right runner was picked
#      and the resolved command looks right.

cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

ROOT="$(pwd)"
OUT="$ROOT/tmp/test-code"
rm -rf "$OUT"
mkdir -p "$OUT"

# `task test code` from a tmp project. The shared `task`
# function in test/lib.sh runs `pnpm tsx code/console` as a
# relative path — fine from the repo root, broken once we
# `cd $dir`. This wrapper forces an absolute path so the
# CLI's `process.cwd()` reflects the project under test
# (which is what runner-detection reads), while the bin
# itself is still resolved at the repo root.
task_in() {
  local dir="$1"; shift
  (cd "$dir" && pnpm tsx "$ROOT/code/console" "$@")
}

# ── 1. help wiring ────────────────────────────────────────────
suite "test code — help wiring"

step "task test code --help mentions every runner"
expect_contains "jest"     "task test code --help" "jest"
expect_contains "vitest"   "task test code --help" "vitest"
expect_contains "mocha"    "task test code --help" "mocha"
expect_contains "pytest"   "task test code --help" "pytest"
expect_contains "cargo"    "task test code --help" "cargo"
expect_contains "go"       "task test code --help" "go"
expect_contains "swift"    "task test code --help" "swift"
expect_contains "xctest"   "task test code --help" "xctest"
expect_contains "rspec"    "task test code --help" "rspec"
expect_contains "phpunit"  "task test code --help" "phpunit"

step "unified flags listed"
expect_contains "--filter"     "task test code --help" "filter"
expect_contains "--watch"      "task test code --help" "watch"
expect_contains "--coverage"   "task test code --help" "coverage"
expect_contains "--reporter"   "task test code --help" "reporter"
expect_contains "--bail"       "task test code --help" "bail"
expect_contains "--workers"    "task test code --help" "workers"
expect_contains "--update-snapshots" "task test code --help" "update-snapshots"

summary

# ── 2. builder argv (unit asserts via tsx) ────────────────────
suite "test code — builder argv"

step "every runner produces the right command from unified flags"
if "$ROOT/node_modules/.bin/tsx" test/unit/test-runner-builders.ts >/tmp/test-runner-asserts.out 2>&1; then
  _pass "all builder asserts pass"
else
  _fail "$(cat /tmp/test-runner-asserts.out | tail -20)"
fi

summary

# ── 3. auto-detection per runner ──────────────────────────────
# Drop a marker file in a temp dir, cd in, run with --dry-run +
# --explain, assert the planned command looks right.
suite "test code — auto-detection by marker file"

# Helper: run `task test code --dry-run --explain` from a tmp
# project containing $1 (the marker file) and assert $2 is in
# the printed command.
detect_in_dir() {
  local label="$1"
  local marker_path="$2"
  local marker_body="$3"
  local needle="$4"
  local extra_flags="${5:-}"

  local dir
  dir="$(mktemp -d "$OUT/det.XXXXXX")"
  mkdir -p "$(dirname "$dir/$marker_path")"
  printf '%s' "$marker_body" > "$dir/$marker_path"

  step "$label"
  if ! out=$(task_in "$dir" test code --dry-run --explain $extra_flags 2>&1); then
    _fail "$label (command failed: $out)"
    return
  fi
  if printf '%s' "$out" | grep -Eq "$needle"; then
    _pass "$label → $(printf '%s' "$out" | tail -1)"
  else
    _fail "$label (no match for /$needle/ in output: $out)"
  fi
}

detect_in_dir "vitest from package.json devDeps" \
  "package.json" \
  '{"name":"x","devDependencies":{"vitest":"^1"}}' \
  '\[vitest\]'

detect_in_dir "jest from package.json devDeps" \
  "package.json" \
  '{"name":"x","devDependencies":{"jest":"^29"}}' \
  '\[jest\]'

detect_in_dir "mocha from package.json devDeps" \
  "package.json" \
  '{"name":"x","devDependencies":{"mocha":"^10"}}' \
  '\[mocha\]'

detect_in_dir "pytest from pyproject.toml [tool.pytest]" \
  "pyproject.toml" \
  '[tool.pytest.ini_options]
testpaths = ["tests"]
' \
  '\[pytest\]'

detect_in_dir "cargo from Cargo.toml" \
  "Cargo.toml" \
  '[package]
name = "x"
' \
  '\[cargo\]'

detect_in_dir "go from go.mod" \
  "go.mod" \
  'module x
' \
  '\[go\]'

detect_in_dir "swift from Package.swift" \
  "Package.swift" \
  '// swift-tools-version:5.7' \
  '\[swift\]'

detect_in_dir "rspec from .rspec" \
  ".rspec" \
  '--require spec_helper' \
  '\[rspec\]'

detect_in_dir "phpunit from phpunit.xml" \
  "phpunit.xml" \
  '<?xml version="1.0"?><phpunit/>' \
  '\[phpunit\]'

summary

# ── 4. unified flags translate per runner ─────────────────────
suite "test code — unified flag translation"

# vitest --filter / --coverage / --reporter junit
{
  dir="$(mktemp -d "$OUT/vit.XXXXXX")"
  echo '{"name":"x","devDependencies":{"vitest":"^1"}}' > "$dir/package.json"
  step "vitest: --filter login --coverage --reporter junit"
  out=$(task_in "$dir" test code --runner vitest --filter login --coverage --reporter junit --reporter-output r.xml --dry-run 2>&1)
  if printf '%s' "$out" | grep -Fq -- "-t login" \
     && printf '%s' "$out" | grep -Fq -- "--coverage" \
     && printf '%s' "$out" | grep -Fq -- "--reporter junit" \
     && printf '%s' "$out" | grep -Fq -- "outputFile=r.xml"; then
    _pass "vitest flags translated"
  else
    _fail "vitest flags not translated correctly: $out"
  fi
}

# pytest --filter / --workers / --bail / --junit
{
  dir="$(mktemp -d "$OUT/py.XXXXXX")"
  echo '[tool.pytest.ini_options]' > "$dir/pyproject.toml"
  step "pytest: --filter k1 --workers 4 --bail --reporter junit"
  out=$(task_in "$dir" test code --runner pytest --filter k1 --workers 4 --bail --reporter junit --reporter-output r.xml --dry-run 2>&1)
  if printf '%s' "$out" | grep -Fq -- "-k k1" \
     && printf '%s' "$out" | grep -Fq -- "-n 4" \
     && printf '%s' "$out" | grep -Fq -- " -x" \
     && printf '%s' "$out" | grep -Fq -- "--junitxml=r.xml"; then
    _pass "pytest flags translated"
  else
    _fail "pytest flags not translated correctly: $out"
  fi
}

# cargo --filter / --bail
{
  dir="$(mktemp -d "$OUT/cargo.XXXXXX")"
  echo '[package]
name = "x"' > "$dir/Cargo.toml"
  step "cargo: --filter mod --bail"
  out=$(task_in "$dir" test code --runner cargo --filter mod --bail --dry-run 2>&1)
  if printf '%s' "$out" | grep -Fq -- " -- mod" \
     && printf '%s' "$out" | grep -Fq -- "--fail-fast"; then
    _pass "cargo flags translated"
  else
    _fail "cargo flags not translated correctly: $out"
  fi
}

# go --filter / --coverage
{
  dir="$(mktemp -d "$OUT/go.XXXXXX")"
  echo 'module x' > "$dir/go.mod"
  step "go: --filter TestFoo --coverage"
  out=$(task_in "$dir" test code --runner go --filter TestFoo --coverage --dry-run 2>&1)
  if printf '%s' "$out" | grep -Fq -- "-run TestFoo" \
     && printf '%s' "$out" | grep -Fq -- "-cover" \
     && printf '%s' "$out" | grep -Fq -- "./..."; then
    _pass "go flags translated"
  else
    _fail "go flags not translated correctly: $out"
  fi
}

# phpunit --filter / --bail
{
  dir="$(mktemp -d "$OUT/php.XXXXXX")"
  echo '<?xml version="1.0"?><phpunit/>' > "$dir/phpunit.xml"
  step "phpunit: --filter LoginTest --bail"
  out=$(task_in "$dir" test code --runner phpunit --filter LoginTest --bail --dry-run 2>&1)
  if printf '%s' "$out" | grep -Fq -- "--filter LoginTest" \
     && printf '%s' "$out" | grep -Fq -- "--stop-on-failure"; then
    _pass "phpunit flags translated"
  else
    _fail "phpunit flags not translated correctly: $out"
  fi
}

summary

# ── 5. error paths ────────────────────────────────────────────
suite "test code — clean errors"

# No marker file + no runner + no unified flag → falls through
# to the project-verb path, which itself errors clearly. We
# assert it doesn't crash with a stack trace.
{
  dir="$(mktemp -d "$OUT/empty.XXXXXX")"
  step "empty dir → clear error, not stack trace"
  out=$(task_in "$dir" test code 2>&1 || true)
  if printf '%s' "$out" | grep -Fq "could not infer" \
     || printf '%s' "$out" | grep -Fq "could not detect"; then
    _pass "empty dir errors clearly"
  else
    _fail "expected 'could not infer/detect', got: $out"
  fi
}

# Unsupported flag combo: cargo + --watch
{
  dir="$(mktemp -d "$OUT/cargo-watch.XXXXXX")"
  echo '[package]
name = "x"' > "$dir/Cargo.toml"
  step "cargo + --watch suggests cargo-watch"
  out=$(task_in "$dir" test code --runner cargo --watch --dry-run 2>&1 || true)
  if printf '%s' "$out" | grep -Eq "cargo-watch|watch"; then
    _pass "cargo --watch errors with hint"
  else
    _fail "expected cargo-watch hint, got: $out"
  fi
}

summary
