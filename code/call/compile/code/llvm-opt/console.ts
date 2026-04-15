import { buildCompileConsole } from '~/code/tool/node/compile/console'
import { buildOptCommand } from '~/code/tool/shared/compile/command'

export const compileLlvmOptConsole = buildCompileConsole({
  language: 'llvm-opt',
  describe: 'Run LLVM `opt` on a .ll file (LLVM IR optimizer)',
  builder: buildOptCommand,
  examples: [
    { comment: 'O2 default',   command: 'task compile llvm-opt input.ll -o input.opt.ll' },
    { comment: 'aggressive',   command: 'task compile llvm-opt input.ll -O 3 -o input.opt.ll' },
    { comment: 'extra passes', command: 'task compile llvm-opt input.ll --extra "-loop-unroll,-mem2reg"' },
  ],
})
