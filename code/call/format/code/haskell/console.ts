import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildOrmoluCommand } from '~/code/tool/shared/format/command'

export const formatHaskellConsole = buildFormatConsole({
  language: 'haskell',
  describe: 'Format Haskell source (ormolu --mode inplace)',
  builder: buildOrmoluCommand,
  examples: [
    { comment: 'in-place', command: 'task format haskell Main.hs' },
    { comment: 'stdout',   command: 'task format haskell Main.hs --check' },
  ],
})
