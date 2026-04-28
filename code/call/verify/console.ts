import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { verifyImageConsole } from './image/console'
import { verifyTlsConsole } from './tls/console'

registerGroupHelp({
  command: 'task verify',
  describe: 'Verify the integrity or content of an asset',
  commands: [
    { name: 'image', describe: 'Verify that an image file is valid' },
    { name: 'tls',   describe: 'Verify the served TLS chain validates locally' },
  ],
})

export const verifyConsole: CommandModule = {
  command: 'verify <thing>',
  describe: 'Verify the integrity or content of an asset',
  builder: y =>
    y
      .command(verifyImageConsole)
      .command(verifyTlsConsole)
      .demandCommand(1, 'Specify what to verify'),
  handler: () => {},
}
