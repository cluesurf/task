#!/usr/bin/env -S node --no-warnings=ExperimentalWarning
/**
 * CLI entrypoint for the `task` bin (see package.json `bin`).
 *
 * This file only wires the top-level action groups. Each group
 * lives at `code/call/<action>/console.ts` and collects its
 * concrete subcommands from `code/call/<action>/<thing>/console.ts`.
 * Sub-subcommands lazy-import `./node` inside their handlers so
 * heavy native deps (DuckDB, ffmpeg, etc.) only load when a
 * command actually runs.
 *
 * To add a new action verb: create `code/call/<action>/console.ts`
 * and import it here.
 */

import yargs from 'yargs'

import {
  setLoggingStyle,
  resolveLoggingStyle,
} from '~/code/tool/node/spinner'
import { archiveConsole } from '~/code/call/archive/console'
import { checkConsole } from '~/code/call/check/console'
import { compileConsole } from '~/code/call/compile/console'
import { convertConsole } from '~/code/call/convert/console'
import { cropConsole } from '~/code/call/crop/console'
import { disassembleConsole } from '~/code/call/disassemble/console'
import { downloadConsole } from '~/code/call/download/console'
import { extractConsole } from '~/code/call/extract/console'
import { formatConsole } from '~/code/call/format/console'
import { generateConsole } from '~/code/call/generate/console'
import { inspectConsole } from '~/code/call/inspect/console'
import { optimizeConsole } from '~/code/call/optimize/console'
import { parseConsole } from '~/code/call/parse/console'
import { removeConsole } from '~/code/call/remove/console'
import { resizeConsole } from '~/code/call/resize/console'
import { sanitizeConsole } from '~/code/call/sanitize/console'
import { sliceConsole } from '~/code/call/slice/console'
import { validateConsole } from '~/code/call/validate/console'
import { verifyConsole } from '~/code/call/verify/console'

process.on('uncaughtException', err => {
  logError(err)
  process.exit(1)
})

async function main() {
  const argv = process.argv.slice(2)

  await yargs(argv)
    .scriptName('task')
    .usage('$0 <action> [thing] [options]')
    .option('format', {
      alias: 'f',
      describe:
        'Output style. `pretty` (default) uses colors + ora spinner; ' +
        '`text` strips ANSI; `json` / `json:pretty` emit one JSON ' +
        'object per action on stdout.',
      type: 'string',
      choices: ['pretty', 'text', 'plain', 'json', 'json:pretty'],
      default: 'pretty',
      global: true,
    })
    .middleware(argv => {
      setLoggingStyle(resolveLoggingStyle(argv.format))
    })
    .command(archiveConsole)
    .command(checkConsole)
    .command(compileConsole)
    .command(convertConsole)
    .command(cropConsole)
    .command(disassembleConsole)
    .command(downloadConsole)
    .command(extractConsole)
    .command(formatConsole)
    .command(generateConsole)
    .command(inspectConsole)
    .command(optimizeConsole)
    .command(parseConsole)
    .command(removeConsole)
    .command(resizeConsole)
    .command(sanitizeConsole)
    .command(sliceConsole)
    .command(validateConsole)
    .command(verifyConsole)
    .demandCommand(1, 'Specify an action')
    .strict()
    .help()
    .alias('help', 'h')
    .version()
    .alias('version', 'v')
    .parseAsync()
}

function logError(err: unknown): void {
  if (err instanceof Error) {
    console.error(err.message)
  } else {
    console.error(String(err))
  }
}

main().catch(err => {
  logError(err)
  process.exit(1)
})
