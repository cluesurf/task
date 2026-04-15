import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildPrettierCommand } from '~/code/tool/shared/format/command'

export const formatJsonConsole = buildFormatConsole({
  language: 'json',
  describe: 'Format JSON (prettier --parser json)',
  builder: o => buildPrettierCommand({ ...o, parser: 'json' }),
  examples: [
    { comment: 'in-place', command: 'task format json package.json' },
  ],
})
