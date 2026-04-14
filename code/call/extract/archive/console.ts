import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const extractArchiveConsole = buildActionCommand({
  command: 'archive',
  describe: 'Extract files from an archive',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'extract_archive_command_input',

})
