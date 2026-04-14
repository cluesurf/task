import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const parseCodeConsole = buildActionCommand({
  command: 'code',
  describe: 'Parse source code into an AST or tokens',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'parse_code_command_input',
  loadHandler: () => import('./node'),
})
