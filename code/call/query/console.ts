import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { queryDbConsole } from './db/console'
import { querySqlConsole } from './sql/console'

registerGroupHelp({
  command: 'task query',
  describe: 'Run a query against a database or a set of files',
  commands: [
    { name: 'db', describe: 'Run a SQL query against Postgres' },
    { name: 'sql', describe: 'Run analytical SQL over files (DuckDB)' },
  ],
})

export const queryConsole: CommandModule = {
  command: 'query <thing>',
  describe: 'Run a query against a database or files',
  builder: y =>
    y
      .command(queryDbConsole)
      .command(querySqlConsole)
      .demandCommand(1, 'Specify what to query'),
  handler: () => {},
}
