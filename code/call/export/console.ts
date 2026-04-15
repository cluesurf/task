import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { exportDbConsole } from './db/console'

registerGroupHelp({
  command: 'task export',
  describe: 'Export data from a source (database, file, ...) to disk',
  commands: [
    { name: 'db', describe: 'Export a Postgres table or query' },
  ],
})

export const exportConsole: CommandModule = {
  command: 'export <thing>',
  describe: 'Export data from a source to disk',
  builder: y =>
    y.command(exportDbConsole).demandCommand(1, 'Specify what to export'),
  handler: () => {},
}
