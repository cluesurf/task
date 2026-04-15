import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildPrettierCommand } from '~/code/tool/shared/format/command'

export const formatHtmlConsole = buildFormatConsole({
  language: 'html',
  describe: 'Format HTML (prettier --parser html)',
  builder: o => buildPrettierCommand({ ...o, parser: 'html' }),
  examples: [
    { comment: 'in-place', command: 'task format html index.html' },
    { comment: 'check',    command: 'task format html index.html --check' },
  ],
})
