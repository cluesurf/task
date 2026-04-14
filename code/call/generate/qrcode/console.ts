import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const generateQrcodeConsole = buildActionCommand({
  command: 'qrcode',
  describe: 'Generate a QR code image from text',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'generate_qrcode_command_input',

})
