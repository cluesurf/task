import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/compile/code/wast/console/options'

export const compileWastConsole = buildActionCommand({
  command: 'wast',
  describe: 'Compile WebAssembly text (wast) to wasm',
  options,
  examples: [
    {
      comment: 'compile WebAssembly text to a wasm binary',
      command:
        'task compile wast -i module.wast -o module.wasm',
    },
  ],
})
