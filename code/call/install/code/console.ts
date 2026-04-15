import { buildProjectVerbConsole } from '~/code/call/project/shared'
export const installCodeConsole = buildProjectVerbConsole({
  verb: 'install',
  describe: 'Install project dependencies (pnpm install / cargo / pip / bundle / ...)',
  command: 'code',
  helpCommand: 'task install code',
})
