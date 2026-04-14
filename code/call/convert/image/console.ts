import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const convertImageConsole = buildActionCommand({
  command: 'image',
  describe: 'Convert between image formats',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'convert_image_command_input',
  loadHandler: () => import('./node'),
})
