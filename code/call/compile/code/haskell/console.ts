import { buildCompileConsole } from '~/code/tool/node/compile/console'
import { buildHaskellCommand } from '~/code/tool/shared/compile/command'

export const compileHaskellConsole = buildCompileConsole({
  language: 'haskell',
  describe: 'Compile Haskell to a native binary (ghc -O)',
  builder: buildHaskellCommand,
  examples: [
    { comment: 'single file', command: 'task compile haskell Main.hs -o app' },
  ],
})
