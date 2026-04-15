import { buildProjectVerbConsole } from '~/code/tool/node/project-verb'
export const projectInstallConsole = buildProjectVerbConsole({
  verb: 'install',
  describe: 'Install project dependencies',
})
