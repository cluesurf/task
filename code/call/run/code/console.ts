import { buildProjectVerbConsole } from '~/code/call/project/shared'
export const runCodeConsole = buildProjectVerbConsole({
  verb: 'run',
  describe: 'Start the dev server / default entrypoint (zero-config)',
  command: 'code',
  helpCommand: 'task run code',
})
