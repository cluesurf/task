import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildPrettierCommand } from '~/code/tool/shared/format/command'

export const formatCssConsole = buildFormatConsole({
  language: 'css',
  describe: 'Format CSS (prettier --parser css)',
  builder: o => buildPrettierCommand({ ...o, parser: 'css' }),
  examples: [
    { comment: 'in-place', command: 'task format css styles.css' },
  ],
})
