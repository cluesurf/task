import { buildCompileConsole } from '~/code/tool/node/compile/console'
import { buildLlcCommand } from '~/code/tool/shared/compile/command'

export const compileLlvmLlcConsole = buildCompileConsole({
  language: 'llvm-llc',
  describe: 'Run LLVM `llc` on a .ll file (LLVM IR → assembly / object)',
  builder: buildLlcCommand,
  examples: [
    { comment: 'asm (default)',  command: 'task compile llvm-llc input.ll -o input.s' },
    { comment: 'object file',    command: 'task compile llvm-llc input.ll -o input.o --extra "-filetype=obj"' },
    { comment: 'arm64 target',   command: 'task compile llvm-llc input.ll --extra "-mtriple=aarch64-apple-darwin"' },
  ],
})
