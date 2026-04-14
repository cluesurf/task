import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const convertVideoConsole = buildActionCommand({
  command: 'video',
  describe: 'Convert between video formats',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'convert_video_command_input',

})
