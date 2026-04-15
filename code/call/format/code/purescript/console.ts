import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildPursTidyCommand } from '~/code/tool/shared/format/command'

export const formatPurescriptConsole = buildFormatConsole({
  language: 'purescript',
  describe: 'Format PureScript source (purs-tidy)',
  builder: buildPursTidyCommand,
  examples: [
    { comment: 'in-place', command: 'task format purescript src/Main.purs' },
    { comment: 'stdout',   command: 'task format purescript src/Main.purs --check' },
  ],
})
