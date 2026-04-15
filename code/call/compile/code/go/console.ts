import { buildCompileConsole } from '~/code/tool/node/compile/console'
import { buildGoCommand } from '~/code/tool/shared/compile/command'

export const compileGoConsole = buildCompileConsole({
  language: 'go',
  describe: 'Compile a Go source / package to a binary (go build)',
  builder: buildGoCommand,
  examples: [
    { comment: 'single file', command: 'task compile go main.go -o app' },
    { comment: 'package dir', command: 'task compile go ./cmd/server -o server' },
    { comment: 'static',      command: 'task compile go main.go --extra "-ldflags=-s -w" -o app' },
  ],
})
