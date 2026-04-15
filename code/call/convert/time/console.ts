import { buildActionCommand } from '~/code/tool/shared/console'

export const convertTimeConsole = buildActionCommand({
  command: 'time',
  describe: 'Convert between time zones and date formats',
  // TODO: form convert_time_command_input missing from MESH — re-link schema
  options: [],
  examples: [
    {
      comment: 'convert a UTC timestamp to a local zone',
      command:
        'task convert time --input "2026-04-14T10:00:00Z" --to-zone America/New_York',
    },
  ],
})
