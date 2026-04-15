/**
 * Pure compile-command builders. No I/O, no spawn — every export
 * returns `{ bin, args, install, env? }`. The Node-side runner at
 * `~/code/tool/node/compile/base` shells these out via `spawn`.
 *
 * Each builder takes the same minimal shape:
 *
 *   { input, output?, extra?, optimize?, emit? }
 *
 * `output` defaults to a sibling of the input with the right
 * extension. `emit` (`exe` / `ir` / `asm` / `object`) only affects
 * LLVM-fronted compilers (c / cpp / rust / swift).
 */

import path from 'node:path'

export type EmitKind = 'exe' | 'ir' | 'asm' | 'object'
export type OptLevel = '0' | '1' | '2' | '3' | 's' | 'z'

export type CompileOptions = {
  input: string
  output?: string
  extra?: string[]
  optimize?: OptLevel
  emit?: EmitKind
  /** Override platform exe suffix (mostly for tests). */
  exeSuffix?: string
}

export type CompileCommand = {
  bin: string
  args: string[]
  install: string
  env?: Record<string, string>
}

const INSTALL = {
  go:       'brew install go  /  apt install golang  /  https://go.dev/dl',
  kotlin:   'brew install kotlin  /  https://kotlinlang.org/docs/command-line.html',
  konanc:   'brew install kotlin (then `kotlinc-native` is on PATH)',
  zig:      'brew install zig  /  https://ziglang.org/download',
  ghc:      'brew install ghc  /  https://www.haskell.org/ghcup',
  ocaml:    'brew install ocaml  /  https://ocaml.org/install',
  dart:     'brew install dart-sdk  /  https://dart.dev/get-dart',
  nim:      'brew install nim  /  https://nim-lang.org/install.html',
  crystal:  'brew install crystal  /  https://crystal-lang.org/install',
  v:        'install via https://github.com/vlang/v#installing-v---from-source',
  tsc:      'pnpm add -g typescript',
  emcc:     'install Emscripten SDK: https://emscripten.org/docs/getting_started/downloads.html',
  clang_wasi: 'brew install llvm  /  apt install clang  +  WASI sysroot via https://github.com/WebAssembly/wasi-sdk',
  wasm_pack:  'cargo install wasm-pack  /  brew install wasm-pack',
}

const isWindows = process.platform === 'win32'
const exeExt = (o: CompileOptions): string => o.exeSuffix ?? (isWindows ? '.exe' : '')

function defaultOutput(o: CompileOptions, suffix?: string): string {
  if (o.output) return o.output
  const ext = path.extname(o.input)
  const stem = ext ? o.input.slice(0, -ext.length) : o.input
  return stem + (suffix ?? exeExt(o))
}

// ---- non-LLVM language compilers --------------------------------

export function buildGoCommand(o: CompileOptions): CompileCommand {
  return {
    bin: 'go',
    args: ['build', '-o', defaultOutput(o), ...(o.extra ?? []), o.input],
    install: INSTALL.go,
  }
}

export function buildKotlinJvmCommand(o: CompileOptions): CompileCommand {
  // -include-runtime makes the .jar self-contained (java -jar foo.jar works).
  return {
    bin: 'kotlinc',
    args: [o.input, '-include-runtime', '-d', defaultOutput(o, '.jar'), ...(o.extra ?? [])],
    install: INSTALL.kotlin,
  }
}

export function buildKotlinNativeCommand(o: CompileOptions): CompileCommand {
  // kotlinc-native auto-appends the platform extension (.kexe / .exe).
  return {
    bin: 'kotlinc-native',
    args: [o.input, '-o', defaultOutput(o, ''), ...(o.extra ?? [])],
    install: INSTALL.konanc,
  }
}

export function buildZigCommand(o: CompileOptions): CompileCommand {
  // `zig build-exe` outputs to the cwd by default; -femit-bin lets us
  // place it explicitly.
  return {
    bin: 'zig',
    args: ['build-exe', `-femit-bin=${defaultOutput(o)}`, ...(o.extra ?? []), o.input],
    install: INSTALL.zig,
  }
}

export function buildHaskellCommand(o: CompileOptions): CompileCommand {
  // -outputdir keeps the .hi / .o droppings out of the source tree.
  const outDir = path.dirname(defaultOutput(o))
  return {
    bin: 'ghc',
    args: ['-O', '-o', defaultOutput(o), '-outputdir', outDir, ...(o.extra ?? []), o.input],
    install: INSTALL.ghc,
  }
}

export function buildOcamlCommand(o: CompileOptions): CompileCommand {
  // `ocamlfind ocamlopt` is the modern entry; bare `ocamlopt` works
  // too. We use `ocamlopt` directly to avoid forcing ocamlfind.
  return {
    bin: 'ocamlopt',
    args: ['-O3', '-o', defaultOutput(o), ...(o.extra ?? []), o.input],
    install: INSTALL.ocaml,
  }
}

export function buildDartCommand(o: CompileOptions): CompileCommand {
  return {
    bin: 'dart',
    args: ['compile', 'exe', o.input, '-o', defaultOutput(o), ...(o.extra ?? [])],
    install: INSTALL.dart,
  }
}

export function buildNimCommand(o: CompileOptions): CompileCommand {
  // -d:release enables the LLVM optimizer pass; --hints:off cleans
  // the output for piping.
  return {
    bin: 'nim',
    args: ['compile', '-d:release', '--hints:off', `-o:${defaultOutput(o)}`, ...(o.extra ?? []), o.input],
    install: INSTALL.nim,
  }
}

export function buildCrystalCommand(o: CompileOptions): CompileCommand {
  return {
    bin: 'crystal',
    args: ['build', '--release', '-o', defaultOutput(o), ...(o.extra ?? []), o.input],
    install: INSTALL.crystal,
  }
}

export function buildVCommand(o: CompileOptions): CompileCommand {
  return {
    bin: 'v',
    args: ['-prod', '-o', defaultOutput(o), ...(o.extra ?? []), o.input],
    install: INSTALL.v,
  }
}

/**
 * `tsc` type-check only — no JS emitted. Sets exit code on type
 * errors so CI usage works.
 */
export function buildTscCheckCommand(o: CompileOptions): CompileCommand {
  return {
    bin: 'tsc',
    args: ['--noEmit', '--pretty', ...(o.extra ?? []), o.input],
    install: INSTALL.tsc,
  }
}

// ---- WASM targets ----------------------------------------------

export function buildEmccCommand(o: CompileOptions): CompileCommand {
  // emcc -o foo.html / .js / .wasm — chosen via output extension.
  // Default to .wasm (just the binary, no JS glue).
  const out = o.output ?? defaultOutput({ ...o, exeSuffix: '' }, '.wasm')
  return {
    bin: 'emcc',
    args: [o.input, '-o', out, ...(o.extra ?? [])],
    install: INSTALL.emcc,
  }
}

export function buildWasiCommand(o: CompileOptions): CompileCommand {
  // Requires WASI sysroot installed. User configures via
  // WASI_SYSROOT env var; we propagate.
  const out = o.output ?? defaultOutput({ ...o, exeSuffix: '' }, '.wasm')
  const sysroot = process.env.WASI_SYSROOT
  const args = ['--target=wasm32-wasi']
  if (sysroot) args.push(`--sysroot=${sysroot}`)
  args.push('-o', out, ...(o.extra ?? []), o.input)
  return { bin: 'clang', args, install: INSTALL.clang_wasi }
}

export function buildWasmPackCommand(o: CompileOptions & { target?: 'web' | 'bundler' | 'nodejs' | 'no-modules' }): CompileCommand {
  // wasm-pack operates on a Cargo project dir, not a single file.
  // `o.input` is the project root.
  const target = o.target ?? 'web'
  const out = o.output ?? path.join(o.input, 'pkg')
  return {
    bin: 'wasm-pack',
    args: ['build', o.input, '--target', target, '--out-dir', out, ...(o.extra ?? [])],
    install: INSTALL.wasm_pack,
  }
}

// ---- LLVM emit modes (clang / rustc / swiftc) ------------------

export type LlvmEmitOptions = CompileOptions & {
  /** Source language — drives compiler choice. */
  lang: 'c' | 'cpp' | 'rust' | 'swift'
}

export function buildLlvmEmitCommand(o: LlvmEmitOptions): CompileCommand {
  switch (o.lang) {
    case 'c':    return clangEmit(o, 'clang')
    case 'cpp':  return clangEmit(o, 'clang++')
    case 'rust': return rustcEmit(o)
    case 'swift':return swiftcEmit(o)
  }
}

function clangEmit(o: LlvmEmitOptions, bin: 'clang' | 'clang++'): CompileCommand {
  const args: string[] = []
  if (o.optimize) args.push(`-O${o.optimize}`)
  switch (o.emit ?? 'exe') {
    case 'ir':     args.push('-S', '-emit-llvm', '-o', o.output ?? defaultOutput({ ...o, exeSuffix: '' }, '.ll')); break
    case 'asm':    args.push('-S', '-o', o.output ?? defaultOutput({ ...o, exeSuffix: '' }, '.s')); break
    case 'object': args.push('-c', '-o', o.output ?? defaultOutput({ ...o, exeSuffix: '' }, '.o')); break
    case 'exe':    args.push('-o', defaultOutput(o)); break
  }
  args.push(...(o.extra ?? []), o.input)
  return { bin, args, install: 'install LLVM (brew install llvm / apt install clang)' }
}

function rustcEmit(o: LlvmEmitOptions): CompileCommand {
  const args: string[] = []
  if (o.optimize) args.push(`-C`, `opt-level=${o.optimize}`)
  switch (o.emit ?? 'exe') {
    case 'ir':     args.push('--emit=llvm-ir', '-o', o.output ?? defaultOutput({ ...o, exeSuffix: '' }, '.ll')); break
    case 'asm':    args.push('--emit=asm',     '-o', o.output ?? defaultOutput({ ...o, exeSuffix: '' }, '.s')); break
    case 'object': args.push('--emit=obj',     '-o', o.output ?? defaultOutput({ ...o, exeSuffix: '' }, '.o')); break
    case 'exe':    args.push('-o', defaultOutput(o)); break
  }
  args.push(...(o.extra ?? []), o.input)
  return { bin: 'rustc', args, install: 'install Rust via https://rustup.rs' }
}

function swiftcEmit(o: LlvmEmitOptions): CompileCommand {
  const args: string[] = []
  if (o.optimize) args.push(`-O${o.optimize === 's' || o.optimize === 'z' ? 'size' : ''}`)
  switch (o.emit ?? 'exe') {
    case 'ir':     args.push('-emit-ir',       '-o', o.output ?? defaultOutput({ ...o, exeSuffix: '' }, '.ll')); break
    case 'asm':    args.push('-emit-assembly', '-o', o.output ?? defaultOutput({ ...o, exeSuffix: '' }, '.s')); break
    case 'object': args.push('-c',             '-o', o.output ?? defaultOutput({ ...o, exeSuffix: '' }, '.o')); break
    case 'exe':    args.push('-o', defaultOutput(o)); break
  }
  args.push(...(o.extra ?? []), o.input)
  return { bin: 'swiftc', args, install: 'install Swift via https://swift.org/download' }
}

// ---- LLVM tool wrappers (opt / llc) ----------------------------

export function buildOptCommand(o: CompileOptions): CompileCommand {
  // opt -O2 -S input.ll -o out.ll
  const out = o.output ?? defaultOutput({ ...o, exeSuffix: '' }, '.opt.ll')
  return {
    bin: 'opt',
    args: [`-O${o.optimize ?? '2'}`, '-S', o.input, '-o', out, ...(o.extra ?? [])],
    install: 'install LLVM (brew install llvm)',
  }
}

export function buildLlcCommand(o: CompileOptions): CompileCommand {
  // llc input.ll -o out.s  (asm by default; -filetype=obj for .o)
  const out = o.output ?? defaultOutput({ ...o, exeSuffix: '' }, '.s')
  return {
    bin: 'llc',
    args: [o.input, '-o', out, ...(o.extra ?? [])],
    install: 'install LLVM (brew install llvm)',
  }
}
