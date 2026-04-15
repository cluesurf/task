import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildGofmtCommand } from '~/code/tool/shared/format/command'

export const formatGoConsole = buildFormatConsole({
  language: 'go',
  describe: 'Format Go source (gofmt -s -w)',
  builder: buildGofmtCommand,
  examples: [
    { comment: 'in-place', command: 'task format go main.go' },
    { comment: 'check',    command: 'task format go main.go --check' },
  ],
})
