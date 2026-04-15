import { buildCompileConsole } from '~/code/tool/node/compile/console'
import { buildDartCommand } from '~/code/tool/shared/compile/command'

export const compileDartConsole = buildCompileConsole({
  language: 'dart',
  describe: 'Compile Dart to a self-contained executable (dart compile exe)',
  builder: buildDartCommand,
  examples: [
    { comment: 'exe', command: 'task compile dart bin/main.dart -o app' },
  ],
})
