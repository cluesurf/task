import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const convertVideoConsole = buildActionCommand({
  command: 'video',
  describe: 'Convert between video formats',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'convert_command_input',
  loadHandler: () => import('~/code/call/convert/node'),
  path: ['convert', 'video'],
  examples: [
    {
      comment: 'convert a mov to mp4',
      command:
        'task convert video -I mov -O mp4 -i clip.mov -o clip.mp4',
    },
  ],
})
