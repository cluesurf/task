import { buildProjectVerbConsole } from '~/code/tool/node/project-verb'
export const projectRunConsole = buildProjectVerbConsole({
  verb: 'run',
  describe: 'Start the project dev server / default entrypoint',
})
