import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { dumpFontConsole } from './font/console'
import { dumpDatabaseConsole } from './database/console'

registerGroupHelp({
  command: 'task dump',
  describe: 'Dump a file or database to an editable form',
  commands: [
    { name: 'font',     describe: 'Round-trip a font between binary and TTX (XML)' },
    { name: 'database', describe: 'Dump pg / mysql / sqlite / mongo' },
  ],
})

export const dumpConsole: CommandModule = {
  command: 'dump <thing>',
  describe: 'Dump a file or database to an editable form',
  builder: y =>
    y
      .command(dumpFontConsole)
      .command(dumpDatabaseConsole)
      .demandCommand(1, 'Specify what to dump'),
  handler: () => {},
}
