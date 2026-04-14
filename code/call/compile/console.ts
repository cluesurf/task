import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { compileCConsole } from './code/c/console'
import { compileCppConsole } from './code/cpp/console'
import { compileRustConsole } from './code/rust/console'
import { compileSwiftConsole } from './code/swift/console'
import { compileWastConsole } from './code/wast/console'

registerGroupHelp({
  command: 'task compile',
  describe: 'Compile source code to a binary or bytecode',
  commands: [
    { name: 'c', describe: 'Compile a C source file' },
    { name: 'cpp', describe: 'Compile a C++ source file' },
    { name: 'rust', describe: 'Compile a Rust source file' },
    { name: 'swift', describe: 'Compile a Swift source file' },
    { name: 'wast', describe: 'Compile a WebAssembly text-format file' },
  ],
})

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
