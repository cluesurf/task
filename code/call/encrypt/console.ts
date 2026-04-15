import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { encryptFileConsole } from './file/console'

registerGroupHelp({
  command: 'task encrypt',
  describe: 'Encrypt files with age, openssl, or gpg',
  commands: [
    {
      name: 'file',
      describe: 'Encrypt a file (symmetric passphrase or asymmetric recipient)',
    },
  ],
})

export const encryptConsole: CommandModule = {
  command: 'encrypt <thing>',
  describe: 'Encrypt files with age, openssl, or gpg',
  builder: y =>
    y
      .command(encryptFileConsole)
      .demandCommand(1, 'Specify what to encrypt (e.g. `file`)'),
  handler: () => {},
}
