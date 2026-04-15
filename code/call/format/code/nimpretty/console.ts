import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildNimprettyCommand } from '~/code/tool/shared/format/command'

export const formatNimConsole = buildFormatConsole({
  language: 'nim',
  describe: 'Format Nim source (nimpretty)',
  builder: buildNimprettyCommand,
  examples: [
    { comment: 'in-place', command: 'task format nim main.nim' },
    { comment: 'stdout',   command: 'task format nim main.nim --check' },
  ],
})
