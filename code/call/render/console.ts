import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { renderFontConsole } from './font/console'

registerGroupHelp({
  command: 'task render',
  describe: 'Render a visual artifact (rasterized font sample, ...)',
  commands: [
    { name: 'font', describe: 'Render a text sample through a font to an image' },
  ],
})

export const renderConsole: CommandModule = {
  command: 'render <thing>',
  describe: 'Render a visual artifact (rasterized font sample, ...)',
  builder: y =>
    y
      .command(renderFontConsole)
      .demandCommand(1, 'Specify what to render'),
  handler: () => {},
}
