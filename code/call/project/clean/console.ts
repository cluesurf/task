import { buildProjectVerbConsole } from '../shared'
export const projectCleanConsole = buildProjectVerbConsole({
  verb: 'clean',
  describe: 'Remove build outputs / caches',
})
