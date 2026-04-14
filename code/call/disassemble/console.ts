import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { disassembleBinaryConsole } from './binary/console'

registerGroupHelp({
  command: 'task disassemble',
  describe: 'Disassemble binaries',
  commands: [
    { name: 'binary', describe: 'Disassemble a compiled binary into assembly' },
  ],
})

export const disassembleConsole: CommandModule = {
  command: 'disassemble <thing>',
  describe: 'Disassemble binaries',
  builder: y =>
    y
      .command(disassembleBinaryConsole)
      .demandCommand(1, 'Specify what to disassemble'),
  handler: () => {},
}
