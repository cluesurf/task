import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { queryDbConsole } from './db/console'

registerGroupHelp({
  command: 'task query',
  describe: 'Run a query against a database',
  commands: [
    { name: 'db', describe: 'Run a SQL query against Postgres' },
  ],
})

export const queryConsole: CommandModule = {
  command: 'query <thing>',
  describe: 'Run a query against a database',
  builder: y =>
    y.command(queryDbConsole).demandCommand(1, 'Specify what to query'),
  handler: () => {},
}
