import { buildCompileConsole } from '~/code/tool/node/compile/console'
import { buildOcamlCommand } from '~/code/tool/shared/compile/command'

export const compileOcamlConsole = buildCompileConsole({
  language: 'ocaml',
  describe: 'Compile OCaml to a native binary (ocamlopt -O3)',
  builder: buildOcamlCommand,
  examples: [
    { comment: 'single file', command: 'task compile ocaml main.ml -o app' },
  ],
})
