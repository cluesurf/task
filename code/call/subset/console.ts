import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { subsetFontConsole } from './font/console'

registerGroupHelp({
  command: 'task subset',
  describe: 'Subset a file to a smaller slice (font glyphs, ...)',
  commands: [
    { name: 'font', describe: 'Subset a font to a given set of glyphs or codepoints' },
  ],
})

export const subsetConsole: CommandModule = {
  command: 'subset <thing>',
  describe: 'Subset a file to a smaller slice (font glyphs, ...)',
  builder: y =>
    y
      .command(subsetFontConsole)
      .demandCommand(1, 'Specify what to subset'),
  handler: () => {},
}
