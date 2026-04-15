import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/convert/archive/console/options'

export const convertArchiveConsole = buildActionCommand({
  command: 'archive',
  describe: 'Convert between archive formats (zip, tar, 7z, ...)',
  options,
  path: ['convert', 'archive'],
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'repack a zip as a tarball',
      command:
        'task convert archive -I zip -O tar.gz -i bundle.zip -o bundle.tar.gz',
    },
  ],
})
