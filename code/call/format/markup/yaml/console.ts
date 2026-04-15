import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildPrettierCommand } from '~/code/tool/shared/format/command'

export const formatYamlConsole = buildFormatConsole({
  language: 'yaml',
  describe: 'Format YAML (prettier --parser yaml)',
  builder: o => buildPrettierCommand({ ...o, parser: 'yaml' }),
  examples: [
    { comment: 'in-place', command: 'task format yaml ci.yml' },
  ],
})
