import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { dumpFontConsole } from './font/console'

registerGroupHelp({
  command: 'task dump',
  describe: 'Dump a file to an editable source form (and back)',
  commands: [
    { name: 'font', describe: 'Round-trip a font between binary and TTX (XML)' },
  ],
})

export const dumpConsole: CommandModule = {
  command: 'dump <thing>',
  describe: 'Dump a file to an editable source form (and back)',
  builder: y =>
    y
      .command(dumpFontConsole)
      .demandCommand(1, 'Specify what to dump'),
  handler: () => {},
}
