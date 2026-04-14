import type { CommandModule } from 'yargs'
import { disassembleBinaryConsole } from './binary/console'

export const disassembleConsole: CommandModule = {
  command: 'disassemble <thing>',
  describe: 'Disassemble binaries',
  builder: y =>
    y
      .command(disassembleBinaryConsole)
      .demandCommand(1, 'Specify what to disassemble'),
  handler: () => {},
}
