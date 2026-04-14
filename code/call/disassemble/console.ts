import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { disassembleBinaryConsole } from './binary/console'
import { disassembleWasmConsole } from './wasm/console'
import { disassembleJvmConsole } from './jvm/console'
import { disassembleDotnetConsole } from './dotnet/console'
import { disassembleRadareConsole } from './radare/console'
import { disassembleGhidraConsole } from './ghidra/console'

registerGroupHelp({
  command: 'task disassemble',
  describe: 'Disassemble binaries and bytecode across toolchains',
  commands: [
    { name: 'binary', describe: 'Native binary → assembly (objdump / llvm-objdump)' },
    { name: 'wasm',   describe: 'WebAssembly → text format (wasm2wat)' },
    { name: 'jvm',    describe: 'JVM .class / .jar → bytecode (javap)' },
    { name: 'dotnet', describe: '.NET dll / exe → IL (ildasm)' },
    { name: 'radare', describe: 'Scripted radare2 / rizin session' },
    { name: 'ghidra', describe: 'Headless Ghidra analyze + export' },
  ],
})

export const disassembleConsole: CommandModule = {
  command: 'disassemble <thing>',
  describe: 'Disassemble binaries and bytecode',
  builder: y =>
    y
      .command(disassembleBinaryConsole)
      .command(disassembleWasmConsole)
      .command(disassembleJvmConsole)
      .command(disassembleDotnetConsole)
      .command(disassembleRadareConsole)
      .command(disassembleGhidraConsole)
      .demandCommand(1, 'Specify what to disassemble'),
  handler: () => {},
}
