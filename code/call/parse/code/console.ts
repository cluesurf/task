import { buildActionCommand } from '~/code/tool/shared/console'

export const parseCodeConsole = buildActionCommand({
  command: 'code',
  describe: 'Parse source code into an AST or tokens',
  // TODO: form parse_code_command_input missing from MESH — re-link schema
  options: [],
  loadHandler: () => import('./node'),
})
