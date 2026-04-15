import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildPerltidyCommand } from '~/code/tool/shared/format/command'

export const formatPerlConsole = buildFormatConsole({
  language: 'perl',
  describe: 'Format Perl source (perltidy -b — keeps a .bak sibling)',
  builder: buildPerltidyCommand,
  examples: [
    { comment: 'in-place', command: 'task format perl script.pl' },
    { comment: 'stdout',   command: 'task format perl script.pl --check' },
  ],
})
