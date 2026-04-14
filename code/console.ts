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
 * To register a new top-level action verb (e.g. `extract`,
 * `validate`, etc.): create `code/call/<action>/console.ts` and
 * import it here.
 */

import yargs from 'yargs'

import { convertConsole } from '~/code/call/convert/console'
import { downloadConsole } from '~/code/call/download/console'

process.on('uncaughtException', err => {
  logError(err)
  process.exit(1)
})

async function main() {
  const argv = process.argv.slice(2)

  await yargs(argv)
    .scriptName('task')
    .usage('$0 <action> <thing> [options]')
    .command(convertConsole)
    .command(downloadConsole)
    .demandCommand(1, 'Specify an action (convert, download, etc.)')
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
