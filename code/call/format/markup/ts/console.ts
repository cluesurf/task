import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildPrettierCommand } from '~/code/tool/shared/format/command'

export const formatTsConsole = buildFormatConsole({
  language: 'ts',
  describe: 'Format TypeScript (prettier --parser typescript)',
  builder: o => buildPrettierCommand({ ...o, parser: 'typescript' }),
  examples: [
    { comment: 'in-place', command: 'task format ts src/index.ts' },
  ],
})
