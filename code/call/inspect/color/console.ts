import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const inspectColorConsole = buildActionCommand({
  command: 'color',
  describe: 'Inspect colors in an image',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'inspect_color_command_input',
  loadHandler: () => import('./node'),
})
