import { buildActionCommand } from '~/code/tool/shared/console'

export const generateHashConsole = buildActionCommand({
  command: 'hash',
  describe: 'Generate a cryptographic hash of input content',
  // TODO: form generate_hash_command_input missing from MESH — re-link schema
  options: [],

})
