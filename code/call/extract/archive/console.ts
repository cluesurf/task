import { buildActionCommand } from '~/code/tool/shared/console'

export const extractArchiveConsole = buildActionCommand({
  command: 'archive',
  describe: 'Extract files from an archive',
  // TODO: form extract_archive_command_input missing from MESH — re-link schema
  options: [],
  path: ['extract', 'archive'],
})
