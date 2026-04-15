import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/convert/shared/console/options'

export const convertVideoConsole = buildActionCommand({
  command: 'video',
  describe: 'Convert between video formats',
  options,
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
