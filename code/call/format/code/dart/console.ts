import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildDartFormatCommand } from '~/code/tool/shared/format/command'

export const formatDartConsole = buildFormatConsole({
  language: 'dart',
  describe: 'Format Dart source (dart format)',
  builder: buildDartFormatCommand,
  examples: [
    { comment: 'in-place', command: 'task format dart bin/main.dart' },
    { comment: 'stdout',   command: 'task format dart bin/main.dart --check' },
  ],
})
