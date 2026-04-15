import { buildCompileConsole } from '~/code/tool/node/compile/console'
import { buildCrystalCommand } from '~/code/tool/shared/compile/command'

export const compileCrystalConsole = buildCompileConsole({
  language: 'crystal',
  describe: 'Compile Crystal to a native binary (crystal build --release)',
  builder: buildCrystalCommand,
  examples: [
    { comment: 'release', command: 'task compile crystal main.cr -o app' },
  ],
})
