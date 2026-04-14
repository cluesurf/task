import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const compileCppConsole = buildActionCommand({
  command: 'cpp',
  describe: 'Compile C++ source to a binary artifact',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'compile_cpp_command_input',
  loadHandler: () => import('./node'),
})
