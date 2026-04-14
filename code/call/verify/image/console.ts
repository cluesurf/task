import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const verifyImageConsole = buildActionCommand({
  command: 'image',
  describe: 'Verify an image matches expected content',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'verify_image_command_input',
  loadHandler: () => import('./node'),
})
