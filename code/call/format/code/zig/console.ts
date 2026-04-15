import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildZigFmtCommand } from '~/code/tool/shared/format/command'

export const formatZigConsole = buildFormatConsole({
  language: 'zig',
  describe: 'Format Zig source (zig fmt — always in-place)',
  builder: buildZigFmtCommand,
  examples: [
    { comment: 'in-place', command: 'task format zig main.zig' },
    { comment: 'check',    command: 'task format zig main.zig --check' },
  ],
})
