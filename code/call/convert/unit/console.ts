import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const convertUnitConsole = buildActionCommand({
  command: 'unit',
  describe: 'Convert between units of measure',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'convert_unit_command_input',

})
