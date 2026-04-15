import { buildCompileConsole } from '~/code/tool/node/compile/console'
import { buildWasiCommand } from '~/code/tool/shared/compile/command'

export const compileWasmWasiConsole = buildCompileConsole({
  language: 'wasm-wasi',
  describe: 'Compile C to WASI WebAssembly (clang --target=wasm32-wasi)',
  builder: buildWasiCommand,
  examples: [
    { comment: 'WASI binary (set WASI_SYSROOT in env)', command: 'task compile wasm-wasi main.c -o main.wasm' },
  ],
})
