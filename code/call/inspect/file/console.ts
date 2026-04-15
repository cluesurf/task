import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/inspect/file/console/options'

export const inspectFileConsole = buildActionCommand({
  command: 'file',
  describe: 'Inspect a file and print a key/value table of its metadata',
  options,
  path: ['inspect', 'file'],
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'inspect a pdf',
      command: 'task inspect file -i report.pdf',
    },
    {
      comment: 'inspect a video — JSON for piping',
      command: 'task inspect file -i clip.mp4 -f json | jq .groups',
    },
  ],
})
