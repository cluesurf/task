import { buildProjectVerbConsole } from '~/code/tool/node/project-verb'
export const installCodeConsole = buildProjectVerbConsole({
  verb: 'install',
  describe: 'Install project dependencies (pnpm install / cargo / pip / bundle / ...)',
  command: 'code',
  helpCommand: 'task install code',
})
