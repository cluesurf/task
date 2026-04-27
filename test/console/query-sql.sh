#!/usr/bin/env bash
#
# `task query sql duckdb` — DuckDB over csv / parquet / jsonl /
# arrow. Help + arg validation always; live query gates on
# `duckdb` on PATH.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

OUT=tmp/query-sql
mkdir -p "$OUT"

suite "Query SQL — help"

step "task query sql --help"
expect_contains "wired" "task query sql --help" "sql"

step "task query sql duckdb --help"
expect_contains "wired" "task query sql duckdb --help" "duckdb"

step "advertises sql / from / format flags"
expect_contains "sql flag" "task query sql duckdb --help" "sql"
expect_contains "from flag" "task query sql duckdb --help" "from"
expect_contains "format flag" "task query sql duckdb --help" "format"

summary

suite "Query SQL — input validation (no binary needed)"

step "errors when neither --sql nor --from is given"
if task query sql duckdb >/dev/null 2>&1; then
  _fail "expected error when no sql / from given"
else
  _pass "errors with empty input"
fi

summary

if ! command -v duckdb >/dev/null 2>&1; then
  printf '\n  (duckdb not on PATH — skipping live queries)\n'
  exit 0
fi

suite "Query SQL — live"

CSV="$OUT/tiny.csv"
printf 'id,name\n1,a\n2,b\n3,c\n' > "$CSV"

step "counts rows via --from"
expect_contains "row count = 3" \
  "task query sql duckdb --from \"$CSV\" --select 'count(*) as n' --format csv 2>&1" \
  "3"

step "honors --where"
expect_contains "filtered count = 1" \
  "task query sql duckdb --from \"$CSV\" --select 'count(*) as n' --where \"name='a'\" --format csv 2>&1" \
  "1"

step "raw --sql passes through unchanged"
expect_contains "raw sql works" \
  "task query sql duckdb --sql \"SELECT 1+1 AS sum\" --format csv 2>&1" \
  "2"

step "json output mode"
expect_contains "json key present" \
  "task query sql duckdb --from \"$CSV\" --limit 1 --format json 2>&1" \
  '"id"'

summary
