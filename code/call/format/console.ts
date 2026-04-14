/**
 * Yargs command group for `task format <language> [options]`.
 *
 * Each language's formatter lives at
 * `code/call/format/code/<language>/console.ts` alongside its
 * `node.ts`. The `/code/` path segment is folder organization
 * only — from the CLI's view the command is flat:
 * `task format python ...`, not `task format code python ...`.
 */

import type { CommandModule } from 'yargs'
import { formatAssemblyConsole } from './code/assembly/console'
import { formatClangConsole } from './code/clang/console'
import { formatKotlinConsole } from './code/kotlin/console'
import { formatPythonConsole } from './code/python/console'
import { formatRubyConsole } from './code/ruby/console'
import { formatRustConsole } from './code/rust/console'
import { formatSwiftConsole } from './code/swift/console'

export const formatConsole: CommandModule = {
  command: 'format <language>',
  describe: 'Format source code with a language-specific formatter',
  builder: y =>
    y
      .command(formatAssemblyConsole)
      .command(formatClangConsole)
      .command(formatKotlinConsole)
      .command(formatPythonConsole)
      .command(formatRubyConsole)
      .command(formatRustConsole)
      .command(formatSwiftConsole)
      .demandCommand(1, 'Specify a language'),
  handler: () => {
    /* routed by subcommand */
  },
}
