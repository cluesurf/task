import { buildActionCommand } from '~/code/tool/shared/console'

export const convertUnitConsole = buildActionCommand({
  command: 'unit',
  describe: 'Convert between units of measure',
  // TODO: form convert_unit_command_input missing from MESH — re-link schema
  options: [],
  examples: [
    {
      comment: 'convert kilometres to miles',
      command:
        'task convert unit --value 42 --from km --to mi',
    },
  ],
})
