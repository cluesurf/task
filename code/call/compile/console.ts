import type { CommandModule } from 'yargs'
import { compileCConsole } from './code/c/console'
import { compileCppConsole } from './code/cpp/console'
import { compileRustConsole } from './code/rust/console'
import { compileSwiftConsole } from './code/swift/console'
import { compileWastConsole } from './code/wast/console'

export const compileConsole: CommandModule = {
  command: 'compile <thing>',
  describe: 'Compile source code to a binary or bytecode',
  builder: y =>
    y
      .command(compileCConsole)
      .command(compileCppConsole)
      .command(compileRustConsole)
      .command(compileSwiftConsole)
      .command(compileWastConsole)
      .demandCommand(1, 'Specify what to compile'),
  handler: () => {
    /* routed by subcommand */
  },
}
