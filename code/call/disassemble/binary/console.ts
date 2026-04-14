import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const disassembleBinaryConsole = buildActionCommand({
  command: 'binary',
  describe: 'Disassemble a binary file to assembly',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'disassemble_binary_command_input',

})
