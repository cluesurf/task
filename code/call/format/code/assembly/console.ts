import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const formatAssemblyConsole = buildActionCommand({
  command: 'assembly',
  describe: 'Format assembly source',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'format_assembly_command_input',
  loadHandler: () => import('./node'),
})
