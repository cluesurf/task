import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const generateHashConsole = buildActionCommand({
  command: 'hash',
  describe: 'Generate a cryptographic hash of input content',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'generate_hash_command_input',

})
