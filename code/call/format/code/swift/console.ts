import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const formatSwiftConsole = buildActionCommand({
  command: 'swift',
  describe: 'Format Swift source',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'format_swift_command_input',
  loadHandler: () => import('./node'),
})
