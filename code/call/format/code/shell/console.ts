import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildShfmtCommand } from '~/code/tool/shared/format/command'

export const formatShellConsole = buildFormatConsole({
  language: 'shell',
  describe: 'Format shell scripts (shfmt -i 2 -ci -bn -w)',
  builder: buildShfmtCommand,
  examples: [
    { comment: 'in-place', command: 'task format shell deploy.sh' },
    { comment: 'check',    command: 'task format shell deploy.sh --check' },
  ],
})
