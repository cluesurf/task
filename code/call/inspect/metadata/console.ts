import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const inspectMetadataConsole = buildActionCommand({
  command: 'metadata',
  describe: 'Inspect file metadata (EXIF, XMP, etc.)',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'inspect_metadata_command_input',

})
