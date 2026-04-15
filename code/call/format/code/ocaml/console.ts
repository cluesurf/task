import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildOcamlformatCommand } from '~/code/tool/shared/format/command'

export const formatOcamlConsole = buildFormatConsole({
  language: 'ocaml',
  describe: 'Format OCaml source (ocamlformat --inplace)',
  builder: buildOcamlformatCommand,
  examples: [
    { comment: 'in-place', command: 'task format ocaml main.ml' },
    { comment: 'stdout',   command: 'task format ocaml main.ml --check' },
  ],
})
