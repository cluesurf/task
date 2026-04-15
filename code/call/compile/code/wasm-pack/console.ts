import { buildCompileConsole } from '~/code/tool/node/compile/console'
import { buildWasmPackCommand } from '~/code/tool/shared/compile/command'

export const compileWasmPackConsole = buildCompileConsole({
  language: 'wasm-pack',
  describe: 'Build a Rust crate to WASM via wasm-pack',
  builder: o => buildWasmPackCommand({ ...o, target: 'web' }),
  examples: [
    { comment: 'web target',    command: 'task compile wasm-pack ./crate -o ./pkg' },
    { comment: 'bundler target',command: 'task compile wasm-pack ./crate --extra "--target,bundler"' },
  ],
})
