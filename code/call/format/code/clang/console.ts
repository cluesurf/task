import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const formatClangConsole = buildActionCommand({
  command: 'clang',
  describe: 'Format C/C++/ObjC source with clang-format',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'format_code_with_clang_format_command_input',
  loadHandler: () => import('./node'),
})
