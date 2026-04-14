import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { shapeFontConsole } from './font/console'

registerGroupHelp({
  command: 'task shape',
  describe: 'Run HarfBuzz shaping (text → glyph sequence)',
  commands: [
    { name: 'font', describe: 'Shape text through a font and print the glyph sequence' },
  ],
})

export const shapeConsole: CommandModule = {
  command: 'shape <thing>',
  describe: 'Run HarfBuzz shaping (text → glyph sequence)',
  builder: y =>
    y
      .command(shapeFontConsole)
      .demandCommand(1, 'Specify what to shape'),
  handler: () => {},
}
