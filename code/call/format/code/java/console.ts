import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildJavaFormatCommand } from '~/code/tool/shared/format/command'

export const formatJavaConsole = buildFormatConsole({
  language: 'java',
  describe: 'Format Java source (google-java-format -i)',
  builder: buildJavaFormatCommand,
  examples: [
    { comment: 'in-place', command: 'task format java Main.java' },
    { comment: 'check',    command: 'task format java Main.java --check' },
  ],
})
