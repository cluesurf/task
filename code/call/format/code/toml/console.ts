import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildTaploCommand } from '~/code/tool/shared/format/command'

export const formatTomlConsole = buildFormatConsole({
  language: 'toml',
  describe: 'Format TOML (taplo format)',
  builder: buildTaploCommand,
  examples: [
    { comment: 'in-place', command: 'task format toml Cargo.toml' },
    { comment: 'check',    command: 'task format toml Cargo.toml --check' },
  ],
})
