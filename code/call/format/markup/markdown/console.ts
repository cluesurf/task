import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildPrettierCommand } from '~/code/tool/shared/format/command'

export const formatMarkdownConsole = buildFormatConsole({
  language: 'markdown',
  describe: 'Format Markdown (prettier --parser markdown)',
  builder: o => buildPrettierCommand({ ...o, parser: 'markdown' }),
  examples: [
    { comment: 'in-place', command: 'task format markdown README.md' },
  ],
})
