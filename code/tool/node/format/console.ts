/**
 * Yargs factory for `task format <language>` thin consoles.
 */

import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'
import type { FormatCommand, FormatOptions } from '~/code/tool/shared/format/command'

export function buildFormatConsole(input: {
  language: string
  describe: string
  builder: (o: FormatOptions) => FormatCommand
  examples: Array<{ comment: string; command: string }>
}): CommandModule {
  const { language, describe, builder, examples } = input

  registerHelp({
    command: `task format ${language}`,
    describe,
    options: [
      { long: 'input',   short: 'i', describe: 'File to format' },
      { long: 'check',               describe: 'Print to stdout / exit non-zero on diff (no in-place write)' },
      { long: 'config',              describe: 'Config file path (formatter-specific)' },
      { long: 'extra',               describe: 'Pass-through args (repeatable)' },
    ],
    examples,
  })

  return {
    command: `${language} [input]`,
    describe,
    builder: y => y
      .positional('input', { type: 'string' })
      .option('input',   { alias: 'i', type: 'string' })
      .option('check',   { type: 'boolean' })
      .option('config',  { type: 'string' })
      .option('extra',   { type: 'array', string: true }),
    handler: async argv => {
      const { runFormat } = await import('./make')
      const { runAction } = await import('~/code/tool/node/log')
      const opts: FormatOptions = {
        input: (argv.input as string) ?? (argv._[2] as string),
        write: !(argv.check as boolean | undefined),
        configFile: argv.config as string | undefined,
        extra: argv.extra as string[] | undefined,
      }
      if (!opts.input) throw new Error(`task format ${language}: input file required`)
      await runAction({
        action: 'format',
        input: opts as unknown as Record<string, unknown>,
        run: () => runFormat(builder(opts)),
      })
    },
  }
}
