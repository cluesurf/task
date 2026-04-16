import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/remove/password/console/options'

export const removePasswordConsole = buildActionCommand({
  command: 'password',
  describe: 'Strip a password from a PDF',
  options,
  loadHandler: () => import('./node'),
  path: ['remove', 'password'],
  examples: [
    {
      comment: 'owner-only',
      command: 'task remove password secure.pdf',
    },
    {
      comment: 'with user password',
      command:
        'task remove password secure.pdf --password hunter2 -o open.pdf',
    },
  ],
})
