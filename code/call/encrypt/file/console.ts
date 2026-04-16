import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/encrypt/file/console/options'

export const encryptFileConsole = buildActionCommand({
  command: 'file',
  describe:
    'Encrypt a file with age / openssl / gpg (symmetric or asymmetric)',
  options,
  loadHandler: () => import('./node'),
  path: ['encrypt', 'file'],
  examples: [
    {
      comment: 'symmetric age',
      command: 'task encrypt file -i secret.txt -o secret.txt.age -p mypass',
    },
    {
      comment: 'asymmetric gpg',
      command: 'task encrypt file -i doc.pdf -o doc.pdf.gpg -R alice@example.com',
    },
  ],
})
