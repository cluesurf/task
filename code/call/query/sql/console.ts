/**
 * `task query sql <tool>` group dispatcher.
 *
 * DuckDB is the analytical-query default (csv / parquet / json /
 * arrow). Future siblings: sqlite, mysql, mssql.
 */

import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { querySqlDuckdbConsole } from './duckdb/console'

registerGroupHelp({
  command: 'task query sql',
  describe: 'Run a SQL query — pick the engine that fits the input',
  commands: [
    { name: 'duckdb', describe: 'Analytical SQL on csv/parquet/json files' },
  ],
})

export const querySqlConsole: CommandModule = {
  command: 'sql <tool>',
  describe: 'Run a SQL query',
  builder: y =>
    y
      .command(querySqlDuckdbConsole)
      .demandCommand(1, 'Specify a SQL backend (duckdb)'),
  handler: () => {},
}
