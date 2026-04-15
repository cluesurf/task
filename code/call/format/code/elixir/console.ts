import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildMixFormatCommand } from '~/code/tool/shared/format/command'

export const formatElixirConsole = buildFormatConsole({
  language: 'elixir',
  describe: 'Format Elixir source (mix format)',
  builder: buildMixFormatCommand,
  examples: [
    { comment: 'in-place', command: 'task format elixir lib/my_app.ex' },
    { comment: 'check',    command: 'task format elixir lib/my_app.ex --check' },
  ],
})
