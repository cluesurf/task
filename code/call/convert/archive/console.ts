import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const convertArchiveConsole = buildActionCommand({
  command: 'archive',
  describe: 'Convert between archive formats (zip, tar, 7z, ...)',
  path: ['convert', 'archive'],
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'convert_archive_command_input',
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'repack a zip as a tarball',
      command:
        'task convert archive -I zip -O tar.gz -i bundle.zip -o bundle.tar.gz',
    },
  ],
})
