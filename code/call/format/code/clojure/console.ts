import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildCljfmtCommand } from '~/code/tool/shared/format/command'

export const formatClojureConsole = buildFormatConsole({
  language: 'clojure',
  describe: 'Format Clojure source (cljfmt)',
  builder: buildCljfmtCommand,
  examples: [
    { comment: 'in-place', command: 'task format clojure src/app.clj' },
    { comment: 'check',    command: 'task format clojure src/app.clj --check' },
  ],
})
