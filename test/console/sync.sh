#!/usr/bin/env bash
# Sync — local rsync end-to-end + smb / snapshot help.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

OUT=tmp/sync
SRC="$OUT/src"
DST="$OUT/dst"
rm -rf "$OUT"
mkdir -p "$SRC"
echo hi > "$SRC/a.txt"
echo bye > "$SRC/b.txt"

suite "Sync"

step "local rsync mirror"
task sync "$SRC/" "$DST/" --quiet >/dev/null 2>&1 || true
expect_file "$DST/a.txt"
expect_file "$DST/b.txt"

step "delete-mode prunes"
rm "$SRC/b.txt"
task sync "$SRC/" "$DST/" --delete --quiet >/dev/null 2>&1 || true
[ ! -f "$DST/b.txt" ] && _pass "b.txt removed" || _fail "b.txt should be deleted"

step "snapshot help lists tools"
expect_contains "restic" "task sync snapshot --help" "restic"
expect_contains "borg"   "task sync snapshot --help" "borg"
expect_contains "kopia"  "task sync snapshot --help" "kopia"

step "smb help mentions auto-mount"
expect_contains "smb"        "task sync --help" "smb://"
expect_contains "mount-point" "task sync --help" "mount-point"

summary
