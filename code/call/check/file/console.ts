import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/check/file/console/options'

export const checkFileConsole = buildActionCommand({
  command: 'file',
  describe: 'Check properties of a file (existence, integrity, etc.)',
  options,
  path: ['check', 'file'],
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'check that a file exists and matches its sha256',
      command:
        'task check file --input-file-path ./image.png --sha256 abc123...',
    },
  ],
})
