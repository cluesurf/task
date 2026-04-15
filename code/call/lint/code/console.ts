import { buildProjectVerbConsole } from '~/code/tool/node/project-verb'
export const lintCodeConsole = buildProjectVerbConsole({
  verb: 'lint',
  describe: 'Lint the project (eslint / clippy / golangci-lint / ruff / ...)',
  command: 'code',
  helpCommand: 'task lint code',
})
