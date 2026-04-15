import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildElmFormatCommand } from '~/code/tool/shared/format/command'

export const formatElmConsole = buildFormatConsole({
  language: 'elm',
  describe: 'Format Elm source (elm-format)',
  builder: buildElmFormatCommand,
  examples: [
    { comment: 'in-place', command: 'task format elm src/Main.elm' },
    { comment: 'validate', command: 'task format elm src/Main.elm --check' },
  ],
})
