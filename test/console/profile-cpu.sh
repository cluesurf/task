#!/usr/bin/env bash
#
# `task profile cpu` — sampling profiler dispatch (samply / 0x / clinic).
# Help wiring only — running a real profile requires the binary
# AND a workload, which is too heavy for CI smoke tests.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

suite "Profile CPU — help"

step "task profile cpu --help"
expect_contains "wired" "task profile cpu --help" "cpu"

summary
