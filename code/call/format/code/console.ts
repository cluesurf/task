/**
 * Yargs group for `task format <language>`.
 *
 * There's no single "format code" action — each language has its
 * own formatter, input form, and node entrypoint under
 * `./<language>/`. This file collects them.
 */

import type { CommandModule } from 'yargs'
import { formatAssemblyConsole } from './assembly/console'
import { formatClangConsole } from './clang/console'
import { formatKotlinConsole } from './kotlin/console'
import { formatPythonConsole } from './python/console'
import { formatRubyConsole } from './ruby/console'
import { formatRustConsole } from './rust/console'
import { formatSwiftConsole } from './swift/console'

export const formatCodeConsole: CommandModule = {
  command: 'code <language>',
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
