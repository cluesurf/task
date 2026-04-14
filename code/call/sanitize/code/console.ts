import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const sanitizeCodeConsole = buildActionCommand({
  command: 'code',
  describe: 'Sanitize source code (remove secrets, pii, etc.)',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'sanitize_code_command_input',
  loadHandler: () => import('./node'),
})
