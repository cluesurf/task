import { buildActionCommand } from '~/code/tool/shared/console'

export const verifyImageConsole = buildActionCommand({
  command: 'image',
  describe: 'Verify an image matches expected content',
  // TODO: form verify_image_command_input missing from MESH — re-link schema
  options: [],
  loadHandler: () => import('./node'),
})
