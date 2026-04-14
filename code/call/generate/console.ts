import type { CommandModule } from 'yargs'
import { generateHashConsole } from './hash/console'
import { generateQrcodeConsole } from './qrcode/console'
import { generateStringConsole } from './string/console'

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
