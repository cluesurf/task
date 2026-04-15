import { buildProjectVerbConsole } from '~/code/call/project/shared'
export const cleanCodeConsole = buildProjectVerbConsole({
  verb: 'clean',
  describe: 'Remove build outputs / caches (cargo clean / mvn clean / rm -rf node_modules / ...)',
  command: 'code',
  helpCommand: 'task clean code',
})
