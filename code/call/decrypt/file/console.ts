import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/decrypt/file/console/options'

export const decryptFileConsole = buildActionCommand({
  command: 'file',
  describe:
    'Decrypt a file with age / openssl / gpg (symmetric or asymmetric)',
  options,
  loadHandler: () => import('./node'),
  path: ['decrypt', 'file'],
  examples: [
    {
      comment: 'symmetric age',
      command: 'task decrypt file -i secret.txt.age -o secret.txt -p mypass',
    },
    {
      comment: 'identity file',
      command: 'task decrypt file -i doc.age -o doc.pdf --identity key.txt',
    },
  ],
})
