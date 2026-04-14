import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const optimizeImageConsole = buildActionCommand({
  command: 'image',
  describe: 'Optimize an image (reduce size, quantize, etc.)',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'optimize_image_local_command_input',

})
