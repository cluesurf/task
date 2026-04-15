import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildDfmtCommand } from '~/code/tool/shared/format/command'

export const formatDConsole = buildFormatConsole({
  language: 'd',
  describe: 'Format D source (dfmt --inplace)',
  builder: buildDfmtCommand,
  examples: [
    { comment: 'in-place', command: 'task format d main.d' },
    { comment: 'stdout',   command: 'task format d main.d --check' },
  ],
})
