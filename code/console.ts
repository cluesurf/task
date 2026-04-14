#!/usr/bin/env -S node --no-warnings=ExperimentalWarning
/**
 * CLI entrypoint for the `task` bin (see package.json `bin`).
 *
 * This file only does the yargs wiring. Each action under
 * `code/call/<action>/<thing>/console.ts` exports a yargs
 * `CommandModule` that declares its own CLI options. Those modules
 * are imported eagerly (their option metadata is cheap) but they
 * lazy-import their `./node` implementation inside the handler so
 * heavy native deps (DuckDB, ffmpeg, etc.) only load when the
 * command actually runs.
 *
 * To register a new action:
 *
 *   1. Write `code/call/<action>/<thing>/console.ts` exporting a
 *      `CommandModule`.
 *   2. Import it here and plug it under the matching top-level
 *      action group below.
 */

import yargs from 'yargs'

// Per-action subcommand definitions.
import { convertDataConsole } from '~/code/call/convert/data/console'
import { downloadHuggingFaceConsole } from '~/code/call/download/hugging-face/console'

process.on('uncaughtException', err => {
  logError(err)
  process.exit(1)
})

async function main() {
  // Skip the node binary and script path (equivalent to yargs/helpers hideBin).
  const argv = process.argv.slice(2)

  await yargs(argv)
    .scriptName('task')
    .usage('$0 <action> <thing> [options]')

    .command(
      'convert <thing>',
      'Convert between formats',
      y => y.command(convertDataConsole).demandCommand(1, 'Specify what to convert'),
    )

    .command(
      'download <thing>',
      'Download from external sources',
      y =>
        y
          .command(downloadHuggingFaceConsole)
          .demandCommand(1, 'Specify what to download'),
    )

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
