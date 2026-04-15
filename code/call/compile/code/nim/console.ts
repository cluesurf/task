import { buildCompileConsole } from '~/code/tool/node/compile/console'
import { buildNimCommand } from '~/code/tool/shared/compile/command'

export const compileNimConsole = buildCompileConsole({
  language: 'nim',
  describe: 'Compile Nim to a native binary (nim compile -d:release)',
  builder: buildNimCommand,
  examples: [
    { comment: 'release', command: 'task compile nim main.nim -o app' },
  ],
})
