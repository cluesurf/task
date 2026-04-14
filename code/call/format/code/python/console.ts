import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const formatPythonConsole = buildActionCommand({
  command: 'python',
  describe: 'Format Python source',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'format_python_command_input',
  loadHandler: () => import('./node'),
})
