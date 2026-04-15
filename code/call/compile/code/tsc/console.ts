import { buildCompileConsole } from '~/code/tool/node/compile/console'
import { buildTscCheckCommand } from '~/code/tool/shared/compile/command'

export const compileTscConsole = buildCompileConsole({
  language: 'tsc',
  describe: 'Type-check TypeScript without emitting JS (tsc --noEmit)',
  builder: buildTscCheckCommand,
  examples: [
    { comment: 'one file',  command: 'task compile tsc src/index.ts' },
    { comment: 'whole project (no input → reads tsconfig)', command: 'task compile tsc' },
  ],
})
