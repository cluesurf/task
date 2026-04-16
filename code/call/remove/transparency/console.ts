import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/remove/transparency/console/options'

export const removeTransparencyConsole = buildActionCommand({
  command: 'transparency',
  describe: 'Flatten alpha channel onto a solid background',
  options,
  loadHandler: () => import('./node'),
  path: ['remove', 'transparency'],
  examples: [
    {
      comment: 'flatten to white',
      command: 'task remove transparency logo.png',
    },
    {
      comment: 'flatten to black',
      command: 'task remove transparency logo.png -b black',
    },
    {
      comment: 'flatten to brand hex',
      command:
        'task remove transparency logo.png -b "#0b1020" -o logo.dark.png',
    },
  ],
})
