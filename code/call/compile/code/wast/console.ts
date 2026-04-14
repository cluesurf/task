import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const compileWastConsole = buildActionCommand({
  command: 'wast',
  describe: 'Compile WebAssembly text (wast) to wasm',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'compile_wast_command_input',
  loadHandler: () => import('./node'),
})
