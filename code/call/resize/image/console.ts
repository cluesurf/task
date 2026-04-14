import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const resizeImageConsole = buildActionCommand({
  command: 'image',
  describe: 'Resize an image',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'resize_image_command_input',

})
