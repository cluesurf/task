import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildCrystalFormatCommand } from '~/code/tool/shared/format/command'

export const formatCrystalConsole = buildFormatConsole({
  language: 'crystal',
  describe: 'Format Crystal source (crystal tool format)',
  builder: buildCrystalFormatCommand,
  examples: [
    { comment: 'in-place', command: 'task format crystal main.cr' },
    { comment: 'check',    command: 'task format crystal main.cr --check' },
  ],
})
