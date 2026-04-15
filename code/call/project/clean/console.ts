import { buildProjectVerbConsole } from '~/code/tool/node/project-verb'
export const projectCleanConsole = buildProjectVerbConsole({
  verb: 'clean',
  describe: 'Remove build outputs / caches',
})
