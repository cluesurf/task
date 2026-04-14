#!/usr/bin/env bash
# Disassemble — verifies all six subcommands are wired and their
# command builders compose. Heavy backends (ghidra, ildasm) are
# checked via help only since most CI runners don't have them.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

suite "Disassemble"

step "lists every subcommand"
expect_contains "binary"  "task disassemble --help" "binary"
expect_contains "wasm"    "task disassemble --help" "wasm"
expect_contains "jvm"     "task disassemble --help" "jvm"
expect_contains "dotnet"  "task disassemble --help" "dotnet"
expect_contains "radare"  "task disassemble --help" "radare"
expect_contains "ghidra"  "task disassemble --help" "ghidra"

step "ghidra profile choices"
expect_contains "functions profile" "task disassemble ghidra --help" "functions"
expect_contains "calls profile"     "task disassemble ghidra --help" "calls"

step "radare profile choices"
expect_contains "functions profile" "task disassemble radare --help" "functions"
expect_contains "calls profile"     "task disassemble radare --help" "calls"

step "dotnet help mentions ildasm"
expect_contains "ildasm" "task disassemble dotnet --help" "ildasm"

step "wasm help mentions wasm2wat"
expect_contains "wasm2wat" "task disassemble wasm --help" "wasm2wat"

summary
