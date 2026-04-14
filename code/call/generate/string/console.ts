import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const generateStringConsole = buildActionCommand({
  command: 'string',
  describe: 'Generate a random or patterned string',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'generate_string_command_input',
  loadHandler: () => import('./node'),
})
