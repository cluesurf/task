#!/usr/bin/env bash
#
# `task trace process` — per-OS strace / dtruss / procmon dispatch.
# Help wiring is reachable without the binary; live trace requires
# privileged perms and is intentionally skipped here.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

suite "Trace process — help"

step "task trace process --help"
expect_contains "wired" "task trace process --help" "process"

summary
