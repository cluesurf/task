import { buildActionCommand } from '~/code/tool/shared/console'

export const sanitizeCodeConsole = buildActionCommand({
  command: 'code',
  describe: 'Sanitize source code (remove secrets, pii, etc.)',
  // TODO: form sanitize_code_command_input missing from MESH — re-link schema
  options: [],

})
