import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildPhpCsFixerCommand } from '~/code/tool/shared/format/command'

export const formatPhpConsole = buildFormatConsole({
  language: 'php',
  describe: 'Format PHP source (php-cs-fixer)',
  builder: buildPhpCsFixerCommand,
  examples: [
    { comment: 'in-place', command: 'task format php src/User.php' },
    { comment: 'check',    command: 'task format php src/User.php --check' },
  ],
})
