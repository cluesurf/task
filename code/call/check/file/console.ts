import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const checkFileConsole = buildActionCommand({
  command: 'file',
  describe: 'Check properties of a file (existence, integrity, etc.)',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'check_file_command_input',
  loadHandler: () => import('./node'),
})
