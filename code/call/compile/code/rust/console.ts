import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const compileRustConsole = buildActionCommand({
  command: 'rust',
  describe: 'Compile Rust source to a binary artifact',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'compile_rust_command_input',
  loadHandler: () => import('./node'),
})
