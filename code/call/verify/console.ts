import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { verifyImageConsole } from './image/console'

registerGroupHelp({
  command: 'task verify',
  describe: 'Verify the integrity or content of an asset',
  commands: [
    { name: 'image', describe: 'Verify that an image file is valid' },
  ],
})

export const verifyConsole: CommandModule = {
  command: 'verify <thing>',
  describe: 'Verify the integrity or content of an asset',
  builder: y =>
    y.command(verifyImageConsole).demandCommand(1, 'Specify what to verify'),
  handler: () => {},
}
