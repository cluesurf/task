import { buildActionCommand } from '~/code/tool/shared/console'

export const generateStringConsole = buildActionCommand({
  command: 'string',
  describe: 'Generate a random or patterned string',
  // TODO: form generate_string_command_input missing from MESH — re-link schema
  options: [],

})
