import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildSqlFormatterCommand } from '~/code/tool/shared/format/command'

export const formatSqlConsole = buildFormatConsole({
  language: 'sql',
  describe: 'Format SQL (sql-formatter --fix)',
  builder: buildSqlFormatterCommand,
  examples: [
    { comment: 'in-place', command: 'task format sql query.sql' },
    { comment: 'stdout',   command: 'task format sql query.sql --check' },
  ],
})
