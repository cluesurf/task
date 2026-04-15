import { buildCompileConsole } from '~/code/tool/node/compile/console'
import { buildVCommand } from '~/code/tool/shared/compile/command'

export const compileVConsole = buildCompileConsole({
  language: 'v',
  describe: 'Compile V to a native binary (v -prod)',
  builder: buildVCommand,
  examples: [
    { comment: 'prod', command: 'task compile v main.v -o app' },
  ],
})
