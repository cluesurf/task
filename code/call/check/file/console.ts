import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const checkFileConsole = buildActionCommand({
  command: 'file',
  describe: 'Check properties of a file (existence, integrity, etc.)',
  mesh: MESH as unknown as Record<string, unknown>,
  path: ['check', 'file'],
  formName: 'check_file_type_using_magic_bytes',
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'check that a file exists and matches its sha256',
      command:
        'task check file --input-file-path ./image.png --sha256 abc123...',
    },
  ],
})
