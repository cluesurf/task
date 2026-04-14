import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const convertTimeConsole = buildActionCommand({
  command: 'time',
  describe: 'Convert between time zones and date formats',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'convert_time_command_input',
  examples: [
    {
      comment: 'convert a UTC timestamp to a local zone',
      command:
        'task convert time --input "2026-04-14T10:00:00Z" --to-zone America/New_York',
    },
  ],
})
