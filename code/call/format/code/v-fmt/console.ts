import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildVFmtCommand } from '~/code/tool/shared/format/command'

export const formatVConsole = buildFormatConsole({
  language: 'v',
  describe: 'Format V source (v fmt -w)',
  builder: buildVFmtCommand,
  examples: [
    { comment: 'in-place', command: 'task format v main.v' },
  ],
})
