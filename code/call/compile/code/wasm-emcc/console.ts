import { buildCompileConsole } from '~/code/tool/node/compile/console'
import { buildEmccCommand } from '~/code/tool/shared/compile/command'

export const compileWasmEmccConsole = buildCompileConsole({
  language: 'wasm-emcc',
  describe: 'Compile C/C++ to WebAssembly via Emscripten (emcc)',
  builder: buildEmccCommand,
  examples: [
    { comment: 'wasm only',     command: 'task compile wasm-emcc main.c -o main.wasm' },
    { comment: 'with JS glue',  command: 'task compile wasm-emcc main.c -o main.js' },
    { comment: 'with html demo',command: 'task compile wasm-emcc main.c -o main.html' },
  ],
})
