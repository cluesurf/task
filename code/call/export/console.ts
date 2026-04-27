import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { exportDbConsole } from './db/console'
import { exportFigmaConsole } from './figma/console'

registerGroupHelp({
  command: 'task export',
  describe: 'Export data from a source to disk',
  commands: [
    { name: 'db',    describe: 'Export a Postgres table or query' },
    { name: 'figma', describe: 'Export Figma frames / nodes as SVG / PNG / JPG / PDF' },
  ],
})

export const exportConsole: CommandModule = {
  command: 'export <thing>',
  describe: 'Export data from a source to disk',
  builder: y =>
    y
      .command(exportDbConsole)
      .command(exportFigmaConsole)
      .demandCommand(1, 'Specify what to export'),
  handler: () => {},
}
