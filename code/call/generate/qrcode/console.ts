import { buildActionCommand } from '~/code/tool/shared/console'

export const generateQrcodeConsole = buildActionCommand({
  command: 'qrcode',
  describe: 'Generate a QR code image from text',
  // TODO: form generate_qrcode_command_input missing from MESH — re-link schema
  options: [],

})
