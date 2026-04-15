import { buildActionCommand } from '~/code/tool/shared/console'

export const optimizeImageConsole = buildActionCommand({
  command: 'image',
  describe: 'Optimize an image (reduce size, quantize, etc.)',
  // TODO: form optimize_image_local_command_input missing from MESH — re-link schema
  options: [],

})
