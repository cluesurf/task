import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { generateHashConsole } from './hash/console'
import { generateQrcodeConsole } from './qrcode/console'
import { generateStringConsole } from './string/console'

registerGroupHelp({
  command: 'task generate',
  describe: 'Generate hashes, QR codes, random strings, and more',
  commands: [
    { name: 'hash', describe: 'Generate a hash of a file or string' },
    { name: 'qrcode', describe: 'Generate a QR code image from text' },
    { name: 'string', describe: 'Generate a random string or token' },
  ],
})

export const generateConsole: CommandModule = {
  command: 'generate <thing>',
  describe: 'Generate hashes, QR codes, random strings, and more',
  builder: y =>
    y
      .command(generateHashConsole)
      .command(generateQrcodeConsole)
      .command(generateStringConsole)
      .demandCommand(1, 'Specify what to generate'),
  handler: () => {},
}
