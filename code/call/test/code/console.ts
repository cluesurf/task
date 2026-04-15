import { buildProjectVerbConsole } from '~/code/tool/node/project-verb'
export const testCodeConsole = buildProjectVerbConsole({
  verb: 'test',
  describe: 'Run the project test suite (zero-config — pytest / cargo test / pnpm test / ...)',
  command: 'code',
  helpCommand: 'task test code',
})
