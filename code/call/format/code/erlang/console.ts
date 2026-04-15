import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildErlfmtCommand } from '~/code/tool/shared/format/command'

export const formatErlangConsole = buildFormatConsole({
  language: 'erlang',
  describe: 'Format Erlang source (erlfmt)',
  builder: buildErlfmtCommand,
  examples: [
    { comment: 'in-place', command: 'task format erlang src/app.erl' },
    { comment: 'check',    command: 'task format erlang src/app.erl --check' },
  ],
})
