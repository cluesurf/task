import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildGleamFormatCommand } from '~/code/tool/shared/format/command'

export const formatGleamConsole = buildFormatConsole({
  language: 'gleam',
  describe: 'Format Gleam source (gleam format)',
  builder: buildGleamFormatCommand,
  examples: [
    { comment: 'in-place', command: 'task format gleam src/main.gleam' },
    { comment: 'check',    command: 'task format gleam src/main.gleam --check' },
  ],
})
