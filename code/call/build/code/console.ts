import { buildProjectVerbConsole } from '~/code/tool/node/project-verb'
// `task build code` — alias for `task project build`. Same handler,
// canonical in the new `task <verb> code` shape.
export const buildCodeConsole = buildProjectVerbConsole({
  verb: 'build',
  describe: 'Build the project (zero-config — pnpm / cargo / go / uv / make / docker / ...)',
  command: 'code',
})
