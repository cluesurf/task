import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildClangTidyCommand } from '~/code/tool/shared/format/command'

export const formatClangTidyConsole = buildFormatConsole({
  language: 'clang-tidy',
  describe: 'Apply clang-tidy fixes (modernize-* / readability-* / include order)',
  builder: buildClangTidyCommand,
  examples: [
    { comment: 'apply fixes',   command: 'task format clang-tidy main.cpp' },
    { comment: 'preview only',  command: 'task format clang-tidy main.cpp --check' },
    { comment: 'limit checks',  command: 'task format clang-tidy main.cpp --extra "--checks=modernize-*"' },
  ],
})
