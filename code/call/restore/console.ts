import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { restoreDatabaseConsole } from './database/console'

registerGroupHelp({
  command: 'task restore',
  describe: 'Restore a backup (database dumps for now)',
  commands: [
    { name: 'database', describe: 'Restore pg / mysql / sqlite / mongo from a dump' },
  ],
})

export const restoreConsole: CommandModule = {
  command: 'restore <thing>',
  describe: 'Restore from a backup',
  builder: y =>
    y
      .command(restoreDatabaseConsole)
      .demandCommand(1, 'Specify what to restore'),
  handler: () => {},
}
