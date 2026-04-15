/**
 * Unit asserts for every compile command builder. No compiler
 * required — these check the pure argv shape each builder
 * returns. Exit code 0 on success; 1 on any assertion fail.
 *
 * Invoked from `test/console/compile.sh`.
 */

import * as B from '~/code/tool/shared/compile/command'
import type { CompileCommand } from '~/code/tool/shared/compile/command'

let failures = 0

function assert(label: string, cond: unknown, detail?: string): void {
  if (cond) {
    process.stdout.write(`  ✓ ${label}\n`)
  } else {
    failures++
    process.stdout.write(`  ✗ ${label}${detail ? ` — ${detail}` : ''}\n`)
  }
}

function has(cmd: CompileCommand, needle: string): boolean {
  return cmd.args.join(' ').includes(needle)
}

function starts(cmd: CompileCommand, prefix: string): boolean {
  return cmd.args.join(' ').startsWith(prefix)
}

// ---- non-LLVM languages ----------------------------------------

let c: CompileCommand

c = B.buildGoCommand({ input: 'main.go', output: 'app' })
assert('go: bin',          c.bin === 'go')
assert('go: build verb',   starts(c, 'build '))
assert('go: -o app',       has(c, ' -o app'))
assert('go: src last',     c.args[c.args.length - 1] === 'main.go')

c = B.buildKotlinJvmCommand({ input: 'Main.kt', output: 'app.jar' })
assert('kotlin-jvm: bin',           c.bin === 'kotlinc')
assert('kotlin-jvm: include-runtime', has(c, '-include-runtime'))
assert('kotlin-jvm: -d app.jar',    has(c, '-d app.jar'))

c = B.buildKotlinNativeCommand({ input: 'Main.kt', output: 'app' })
assert('kotlin-native: bin',    c.bin === 'kotlinc-native')
assert('kotlin-native: -o app', has(c, '-o app'))

c = B.buildZigCommand({ input: 'main.zig', output: 'app' })
assert('zig: bin',          c.bin === 'zig')
assert('zig: build-exe',    has(c, 'build-exe'))
assert('zig: -femit-bin',   has(c, '-femit-bin=app'))

c = B.buildHaskellCommand({ input: 'Main.hs', output: 'app' })
assert('haskell: bin',     c.bin === 'ghc')
assert('haskell: -O',      c.args.includes('-O'))
assert('haskell: -o app',  has(c, '-o app'))

c = B.buildOcamlCommand({ input: 'main.ml', output: 'app' })
assert('ocaml: bin',       c.bin === 'ocamlopt')
assert('ocaml: -O3',       c.args.includes('-O3'))
assert('ocaml: -o app',    has(c, '-o app'))

c = B.buildDartCommand({ input: 'bin/main.dart', output: 'app' })
assert('dart: bin',           c.bin === 'dart')
assert('dart: compile exe',   has(c, 'compile exe'))
assert('dart: -o app',        has(c, '-o app'))

c = B.buildNimCommand({ input: 'main.nim', output: 'app' })
assert('nim: bin',         c.bin === 'nim')
assert('nim: -d:release',  c.args.includes('-d:release'))
assert('nim: -o:app',      c.args.includes('-o:app'))

c = B.buildCrystalCommand({ input: 'main.cr', output: 'app' })
assert('crystal: bin',         c.bin === 'crystal')
assert('crystal: build',       c.args.includes('build'))
assert('crystal: --release',   c.args.includes('--release'))
assert('crystal: -o app',      has(c, '-o app'))

c = B.buildVCommand({ input: 'main.v', output: 'app' })
assert('v: bin',       c.bin === 'v')
assert('v: -prod',     c.args.includes('-prod'))
assert('v: -o app',    has(c, '-o app'))

c = B.buildTscCheckCommand({ input: 'src/index.ts' })
assert('tsc: bin',         c.bin === 'tsc')
assert('tsc: --noEmit',    c.args.includes('--noEmit'))
assert('tsc: --pretty',    c.args.includes('--pretty'))

// ---- WASM targets ----------------------------------------------

c = B.buildEmccCommand({ input: 'main.c', output: 'out.wasm' })
assert('emcc: bin',          c.bin === 'emcc')
assert('emcc: -o out.wasm',  has(c, '-o out.wasm'))

c = B.buildWasiCommand({ input: 'main.c', output: 'out.wasm' })
assert('wasi: bin clang',    c.bin === 'clang')
assert('wasi: wasm32-wasi',  has(c, '--target=wasm32-wasi'))

c = B.buildWasmPackCommand({ input: './crate', output: './pkg', target: 'web' })
assert('wasm-pack: bin',       c.bin === 'wasm-pack')
assert('wasm-pack: build cmd', c.args.includes('build'))
assert('wasm-pack: --target web', has(c, '--target web'))

// ---- LLVM opt / llc -------------------------------------------

c = B.buildOptCommand({ input: 'in.ll', output: 'out.ll' })
assert('opt: bin',     c.bin === 'opt')
assert('opt: -O2',     c.args.includes('-O2'))
assert('opt: -S',      c.args.includes('-S'))

c = B.buildLlcCommand({ input: 'in.ll', output: 'out.s' })
assert('llc: bin',         c.bin === 'llc')
assert('llc: -o out.s',    has(c, '-o out.s'))

// ---- LLVM emit (c / cpp / rust / swift) ------------------------

c = B.buildLlvmEmitCommand({ lang: 'c', input: 'main.c', emit: 'ir' })
assert('llvm-emit c ir: bin',         c.bin === 'clang')
assert('llvm-emit c ir: -S',          c.args.includes('-S'))
assert('llvm-emit c ir: -emit-llvm',  c.args.includes('-emit-llvm'))

c = B.buildLlvmEmitCommand({ lang: 'cpp', input: 'main.cpp', emit: 'asm' })
assert('llvm-emit cpp asm: bin',  c.bin === 'clang++')
assert('llvm-emit cpp asm: -S',   c.args.includes('-S'))
// clang+++ `-S` alone yields asm; `-emit-llvm` absent = asm mode.
assert('llvm-emit cpp asm: no -emit-llvm', !c.args.includes('-emit-llvm'))

c = B.buildLlvmEmitCommand({ lang: 'rust', input: 'main.rs', emit: 'asm' })
assert('llvm-emit rust asm: bin',         c.bin === 'rustc')
assert('llvm-emit rust asm: --emit=asm',  c.args.includes('--emit=asm'))

c = B.buildLlvmEmitCommand({ lang: 'rust', input: 'main.rs', emit: 'ir' })
assert('llvm-emit rust ir: --emit=llvm-ir', c.args.includes('--emit=llvm-ir'))

c = B.buildLlvmEmitCommand({ lang: 'swift', input: 'main.swift', emit: 'object' })
assert('llvm-emit swift obj: bin',    c.bin === 'swiftc')
assert('llvm-emit swift obj: -c',     c.args.includes('-c'))

// ---- optimization level propagation -----------------------------

c = B.buildLlvmEmitCommand({ lang: 'c', input: 'main.c', emit: 'exe', optimize: '2' })
assert('llvm-emit c -O2', c.args.includes('-O2'))

c = B.buildLlvmEmitCommand({ lang: 'rust', input: 'main.rs', emit: 'exe', optimize: '3' })
assert('llvm-emit rust -C opt-level=3',
  c.args.join(' ').includes('-C opt-level=3'))

// ---- exit --------------------------------------------------------

if (failures > 0) {
  process.stdout.write(`\n  ${failures} assertion(s) failed\n`)
  process.exit(1)
}
process.stdout.write('\n  all builder asserts passed\n')
