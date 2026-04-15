import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { decryptFileConsole } from './file/console'

registerGroupHelp({
  command: 'task decrypt',
  describe: 'Decrypt files encrypted with age, openssl, or gpg',
  commands: [
    {
      name: 'file',
      describe:
        'Decrypt a file (symmetric passphrase or asymmetric identity)',
    },
  ],
})

export const decryptConsole: CommandModule = {
  command: 'decrypt <thing>',
  describe: 'Decrypt files (age / openssl / gpg)',
  builder: y =>
    y
      .command(decryptFileConsole)
      .demandCommand(1, 'Specify what to decrypt (e.g. `file`)'),
  handler: () => {},
}
