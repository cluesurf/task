import { buildProjectVerbConsole } from '~/code/tool/node/project-verb'
export const projectTestConsole = buildProjectVerbConsole({
  verb: 'test',
  describe: 'Run the project test suite',
})
