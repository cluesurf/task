import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildScalafmtCommand } from '~/code/tool/shared/format/command'

export const formatScalaConsole = buildFormatConsole({
  language: 'scala',
  describe: 'Format Scala source (scalafmt)',
  builder: buildScalafmtCommand,
  examples: [
    { comment: 'in-place', command: 'task format scala Main.scala' },
    { comment: 'check',    command: 'task format scala Main.scala --check' },
  ],
})
