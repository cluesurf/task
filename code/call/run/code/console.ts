import { buildProjectVerbConsole } from '~/code/tool/node/project-verb'
export const runCodeConsole = buildProjectVerbConsole({
  verb: 'run',
  describe: 'Start the dev server / default entrypoint (zero-config)',
  command: 'code',
  helpCommand: 'task run code',
})
