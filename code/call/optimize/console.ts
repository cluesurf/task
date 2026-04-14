import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { optimizeImageConsole } from './image/console'
import { optimizeVideoConsole } from './video/console'

registerGroupHelp({
  command: 'task optimize',
  describe: 'Optimize an asset',
  commands: [
    { name: 'image', describe: 'Optimize an image for size and quality' },
    { name: 'video', describe: 'Optimize a video for size and quality' },
  ],
})

export const optimizeConsole: CommandModule = {
  command: 'optimize <thing>',
  describe: 'Optimize an asset',
  builder: y =>
    y
      .command(optimizeImageConsole)
      .command(optimizeVideoConsole)
      .demandCommand(1, 'Specify what to optimize'),
  handler: () => {},
}
