import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const removeMetadataConsole = buildActionCommand({
  command: 'metadata',
  describe: 'Strip metadata (EXIF, XMP, etc.) from a file',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'remove_metadata_command_input',
  loadHandler: () => import('./node'),
})
