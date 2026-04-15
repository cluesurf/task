import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { compileCConsole } from './code/c/console'
import { compileCppConsole } from './code/cpp/console'
import { compileRustConsole } from './code/rust/console'
import { compileSwiftConsole } from './code/swift/console'
import { compileWastConsole } from './code/wast/console'
import { compileGoConsole } from './code/go/console'
import { compileKotlinJvmConsole } from './code/kotlin-jvm/console'
import { compileKotlinNativeConsole } from './code/kotlin-native/console'
import { compileZigConsole } from './code/zig/console'
import { compileHaskellConsole } from './code/haskell/console'
import { compileOcamlConsole } from './code/ocaml/console'
import { compileDartConsole } from './code/dart/console'
import { compileNimConsole } from './code/nim/console'
import { compileCrystalConsole } from './code/crystal/console'
import { compileVConsole } from './code/v/console'
import { compileTscConsole } from './code/tsc/console'
import { compileWasmEmccConsole } from './code/wasm-emcc/console'
import { compileWasmWasiConsole } from './code/wasm-wasi/console'
import { compileWasmPackConsole } from './code/wasm-pack/console'
import { compileLlvmOptConsole } from './code/llvm-opt/console'
import { compileLlvmLlcConsole } from './code/llvm-llc/console'

registerGroupHelp({
  command: 'task compile',
  describe: 'Compile source code to a binary, bytecode, IR, or assembly',
  commands: [
    { name: 'c',             describe: 'C source → binary (clang)' },
    { name: 'cpp',           describe: 'C++ source → binary (clang++)' },
    { name: 'rust',          describe: 'Rust source → binary (rustc)' },
    { name: 'swift',         describe: 'Swift source → binary (swiftc)' },
    { name: 'wast',          describe: 'WebAssembly text → binary (wat2wasm)' },
    { name: 'go',            describe: 'Go source → binary (go build)' },
    { name: 'kotlin-jvm',    describe: 'Kotlin → self-contained jar' },
    { name: 'kotlin-native', describe: 'Kotlin → native binary' },
    { name: 'zig',           describe: 'Zig → binary' },
    { name: 'haskell',       describe: 'Haskell → binary (ghc)' },
    { name: 'ocaml',         describe: 'OCaml → native binary (ocamlopt)' },
    { name: 'dart',          describe: 'Dart → exe (dart compile exe)' },
    { name: 'nim',           describe: 'Nim → release binary' },
    { name: 'crystal',       describe: 'Crystal → release binary' },
    { name: 'v',             describe: 'V → prod binary' },
    { name: 'tsc',           describe: 'Type-check TypeScript without emit' },
    { name: 'wasm-emcc',     describe: 'C/C++ → WebAssembly (emscripten)' },
    { name: 'wasm-wasi',     describe: 'C → WASI WebAssembly (clang wasi)' },
    { name: 'wasm-pack',     describe: 'Rust crate → WebAssembly (wasm-pack)' },
    { name: 'llvm-opt',      describe: 'Optimize LLVM IR (.ll) via opt' },
    { name: 'llvm-llc',      describe: 'Lower LLVM IR (.ll) to asm / object via llc' },
  ],
})

export const compileConsole: CommandModule = {
  command: 'compile <thing>',
  describe: 'Compile source code to a binary, bytecode, IR, or assembly',
  builder: y =>
    y
      .command(compileCConsole)
      .command(compileCppConsole)
      .command(compileRustConsole)
      .command(compileSwiftConsole)
      .command(compileWastConsole)
      .command(compileGoConsole)
      .command(compileKotlinJvmConsole)
      .command(compileKotlinNativeConsole)
      .command(compileZigConsole)
      .command(compileHaskellConsole)
      .command(compileOcamlConsole)
      .command(compileDartConsole)
      .command(compileNimConsole)
      .command(compileCrystalConsole)
      .command(compileVConsole)
      .command(compileTscConsole)
      .command(compileWasmEmccConsole)
      .command(compileWasmWasiConsole)
      .command(compileWasmPackConsole)
      .command(compileLlvmOptConsole)
      .command(compileLlvmLlcConsole)
      .demandCommand(1, 'Specify what to compile'),
  handler: () => {},
}
