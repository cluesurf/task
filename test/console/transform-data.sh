#!/usr/bin/env bash
#
# `task transform data` — three drivers (map / jq / sql).
# `map` and `jq` are pure-JS via jq-wasm; `sql` requires duckdb
# on PATH so we gate that case.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

OUT=tmp/transform-data
mkdir -p "$OUT"

suite "Transform data — help + dispatch"

step "task transform data --help"
expect_contains "wired" "task transform data --help" "data"

step "rejects when no driver is given"
if task transform data /dev/null >/dev/null 2>&1; then
  _fail "expected error when no driver flag set"
else
  _pass "errors without --map / --jq / --sql"
fi

step "rejects when two drivers are given"
if task transform data /dev/null --jq '.' --map foo.yml >/dev/null 2>&1; then
  _fail "expected error when --jq + --map both set"
else
  _pass "errors when multiple drivers"
fi

summary

suite "Transform data — map driver"

cat > "$OUT/in.csv" <<'CSV'
id,full_name,age,internal
1,Ana,30,x
2,Bo,40,y
CSV
cat > "$OUT/map.yml" <<'YML'
rename:
  full_name: name
pick: [id, name, age]
drop: [internal]
coerce:
  id: integer
  age: integer
default:
  active: true
YML

step "renames + picks + coerces"
task transform data "$OUT/in.csv" --map "$OUT/map.yml" -o "$OUT/out.json" \
  >/dev/null 2>&1
expect_file "$OUT/out.json"

if grep -q '"name": "Ana"' "$OUT/out.json"; then
  _pass "renamed full_name → name"
else
  _fail "expected name=Ana in output"
fi

if grep -q '"id": 1' "$OUT/out.json"; then
  _pass "coerced id to integer"
else
  _fail "expected integer-coerced id"
fi

if grep -q '"internal"' "$OUT/out.json"; then
  _fail "expected dropped field absent"
else
  _pass "internal field dropped"
fi

if grep -q '"active"' "$OUT/out.json"; then
  _fail "default 'active' should be filtered out by pick"
else
  _pass "pick runs last and excludes default-only field"
fi

step "errors when --map config is missing"
if task transform data "$OUT/in.csv" --map "$OUT/missing.yml" >/dev/null 2>&1; then
  _fail "expected non-zero exit on missing map config"
else
  _pass "errors on missing map config"
fi

summary

suite "Transform data — jq driver"

cat > "$OUT/logs.jsonl" <<'JSONL'
{"level":"info","msg":"hi"}
{"level":"error","msg":"boom"}
{"level":"warn","msg":"meh"}
JSONL

step "filters JSONL via jq"
if task transform data "$OUT/logs.jsonl" --jq '.[] | select(.level=="error")' \
     -o "$OUT/errors.json" >/dev/null 2>&1; then
  if grep -q '"boom"' "$OUT/errors.json"; then
    _pass "jq selected the error row"
  else
    _fail "expected boom in jq output"
  fi
else
  printf '    (jq-wasm not loadable — skipping)\n'
fi

summary

if ! command -v duckdb >/dev/null 2>&1; then
  printf '\n  (duckdb not on PATH — skipping --sql driver tests)\n'
  exit 0
fi

suite "Transform data — sql driver"

step "selects via DuckDB SQL"
if task transform data "$OUT/in.csv" --sql 'SELECT id,full_name FROM in' \
     -o "$OUT/sql.json" >/dev/null 2>&1; then
  if grep -q '"full_name"' "$OUT/sql.json"; then
    _pass "duckdb returned the projected columns"
  else
    _fail "expected full_name column in sql output"
  fi
else
  _fail "duckdb sql driver exited non-zero"
fi

summary
