import { buildProjectVerbConsole } from '~/code/call/project/shared'
export const lintCodeConsole = buildProjectVerbConsole({
  verb: 'lint',
  describe: 'Lint the project (eslint / clippy / golangci-lint / ruff / ...)',
  command: 'code',
  helpCommand: 'task lint code',
})
