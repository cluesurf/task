import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildPrettierCommand } from '~/code/tool/shared/format/command'

export const formatJsConsole = buildFormatConsole({
  language: 'js',
  describe: 'Format JavaScript (prettier --parser babel)',
  builder: o => buildPrettierCommand({ ...o, parser: 'babel' }),
  examples: [
    { comment: 'in-place', command: 'task format js src/index.js' },
  ],
})
