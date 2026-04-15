import { buildProjectVerbConsole } from '~/code/tool/node/project-verb'
// `task format code` — project-wide formatter (rustfmt / prettier
// / gofmt -w . / etc). The existing per-language `task format
// python|rust|...` commands stay; this is the zero-config sibling
// that picks one based on the repo's marker files.
export const formatCodeConsole = buildProjectVerbConsole({
  verb: 'format',
  describe: 'Format the project source tree (zero-config — rustfmt / prettier / gofmt / ...)',
  command: 'code',
  helpCommand: 'task format code',
})
