import { buildProjectVerbConsole } from '~/code/tool/node/project-verb'
export const cleanCodeConsole = buildProjectVerbConsole({
  verb: 'clean',
  describe: 'Remove build outputs / caches (cargo clean / mvn clean / rm -rf node_modules / ...)',
  command: 'code',
  helpCommand: 'task clean code',
})
