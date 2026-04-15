import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { backupDbConsole } from './db/console'

registerGroupHelp({
  command: 'task backup',
  describe: 'Back up a database or filesystem path',
  commands: [
    { name: 'db', describe: 'pg_dump a Postgres database' },
  ],
})

export const backupConsole: CommandModule = {
  command: 'backup <thing>',
  describe: 'Back up a database or filesystem path',
  builder: y =>
    y.command(backupDbConsole).demandCommand(1, 'Specify what to back up'),
  handler: () => {},
}
