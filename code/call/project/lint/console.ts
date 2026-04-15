import { buildProjectVerbConsole } from '~/code/tool/node/project-verb'
export const projectLintConsole = buildProjectVerbConsole({
  verb: 'lint',
  describe: 'Run the project linter',
})
