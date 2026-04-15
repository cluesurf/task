import { buildActionCommand } from '~/code/tool/shared/console'

export const resizeImageConsole = buildActionCommand({
  command: 'image',
  describe: 'Resize an image',
  // TODO: form resize_image_command_input missing from MESH — re-link schema
  options: [],

})
