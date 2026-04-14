import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const convertArchiveConsole = buildActionCommand({
  command: 'archive',
  describe: 'Convert between archive formats (zip, tar, 7z, ...)',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'convert_archive_command_input',
  loadHandler: () => import('./node'),
})
