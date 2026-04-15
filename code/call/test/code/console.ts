import { buildProjectVerbConsole } from '~/code/call/project/shared'
export const testCodeConsole = buildProjectVerbConsole({
  verb: 'test',
  describe: 'Run the project test suite (zero-config — pytest / cargo test / pnpm test / ...)',
  command: 'code',
  helpCommand: 'task test code',
})
