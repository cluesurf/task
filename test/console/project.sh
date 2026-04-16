#!/usr/bin/env bash
# Zero-config runner — verifies detection + command selection
# across every Tier 1 ecosystem using --dry-run.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

ROOT="$(pwd)"
OUT=tmp/project
rm -rf "$OUT"
mkdir -p "$OUT"

# Ask task what it would run for a given verb inside a fabricated
# project root. `project build --dry-run` prints the resolved
# `[source:ecosystem] command` line; we grep for the ecosystem id.
probe() {
  local dir="$1" verb="$2" expect="$3"
  local line
  # Run `tsx` directly via node — pnpm scripts inside a nested
  # cwd get cute about resolving the project root, which breaks
  # detection (tsx ends up running in `$ROOT` instead of `$dir`).
  line=$(cd "$dir" && "$ROOT/node_modules/.bin/tsx" "$ROOT/code/console" "$verb" code --dry-run 2>&1 | tail -5)
  printf '%s' "$line" | grep -Fq "$expect"
}

expect_detect() {
  local label="$1" dir="$2" verb="$3" needle="$4"
  if probe "$dir" "$verb" "$needle"; then
    _pass "$label"
  else
    _fail "$label (no match for \`$needle\`)"
  fi
}

suite "Project runner — detection"

step "pnpm"
mkdir -p "$OUT/pnpm" && echo '{}' > "$OUT/pnpm/package.json" && : > "$OUT/pnpm/pnpm-lock.yaml"
expect_detect "pnpm build"   "$OUT/pnpm"   build "[registry:pnpm] pnpm build"
expect_detect "pnpm test"    "$OUT/pnpm"   test  "[registry:pnpm] pnpm test"

step "bun"
mkdir -p "$OUT/bun" && echo '{}' > "$OUT/bun/package.json" && : > "$OUT/bun/bun.lockb"
expect_detect "bun build"    "$OUT/bun"    build "[registry:bun] bun run build"

step "npm"
mkdir -p "$OUT/npm" && echo '{}' > "$OUT/npm/package.json"
expect_detect "npm build"    "$OUT/npm"    build "[registry:npm] npm run build"

step "cargo"
mkdir -p "$OUT/cargo" && : > "$OUT/cargo/Cargo.toml"
expect_detect "cargo build"  "$OUT/cargo"  build "[registry:cargo] cargo build"

step "go"
mkdir -p "$OUT/go" && : > "$OUT/go/go.mod"
expect_detect "go build"     "$OUT/go"     build "[registry:go] go build ./..."

step "uv"
mkdir -p "$OUT/uv" && : > "$OUT/uv/pyproject.toml" && : > "$OUT/uv/uv.lock"
expect_detect "uv build"     "$OUT/uv"     build "[registry:uv] uv build"

step "poetry"
mkdir -p "$OUT/poetry" && : > "$OUT/poetry/pyproject.toml" && : > "$OUT/poetry/poetry.lock"
expect_detect "poetry test"  "$OUT/poetry" test  "[registry:poetry] poetry run pytest"

step "pip"
mkdir -p "$OUT/pip" && : > "$OUT/pip/requirements.txt"
expect_detect "pip install"  "$OUT/pip"    install "[registry:pip] pip install -r requirements.txt"

step "make"
mkdir -p "$OUT/make" && : > "$OUT/make/Makefile"
expect_detect "make build"   "$OUT/make"   build "[registry:make] make"

step "docker"
mkdir -p "$OUT/docker" && : > "$OUT/docker/Dockerfile"
expect_detect "docker build" "$OUT/docker" build '[registry:docker] docker build'

step "haskell (cabal)"
mkdir -p "$OUT/cabal" && : > "$OUT/cabal/cabal.project"
expect_detect "cabal build"  "$OUT/cabal"  build "[registry:cabal] cabal build"
expect_detect "cabal run"    "$OUT/cabal"  run   "[registry:cabal] cabal run"

step "coq"
mkdir -p "$OUT/coq" && : > "$OUT/coq/_CoqProject"
expect_detect "coq build"    "$OUT/coq"    build "coq_makefile"
expect_detect "coq clean"    "$OUT/coq"    clean "[registry:coq] make clean"

step "bend"
mkdir -p "$OUT/bend" && : > "$OUT/bend/main.bend"
expect_detect "bend build"   "$OUT/bend"   build "[registry:bend] bend gen-cu main.bend"
expect_detect "bend run"     "$OUT/bend"   run   "[registry:bend] bend run main.bend"

step ".taskrc override beats inference"
mkdir -p "$OUT/rc" && : > "$OUT/rc/Cargo.toml"
printf 'build: my-custom-build\n' > "$OUT/rc/.taskrc"
expect_detect ".taskrc win"  "$OUT/rc"     build "[rc:.taskrc] my-custom-build"

summary
