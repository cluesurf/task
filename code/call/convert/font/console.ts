import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const convertFontConsole = buildActionCommand({
  command: 'font',
  describe: 'Convert between font formats',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'convert_font_command_input',
  loadHandler: () => import('./node'),
})
