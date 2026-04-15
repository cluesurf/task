/**
 * Yargs factory for `task compile <lang>` thin consoles. Each
 * language file is a 5-line wrapper around this.
 */

import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'
import type { CompileCommand, CompileOptions, EmitKind, OptLevel } from '~/code/tool/shared/compile/command'

export function buildCompileConsole(input: {
  language: string
  describe: string
  builder: (o: CompileOptions) => CompileCommand
  examples: Array<{ comment: string; command: string }>
  /** Some compilers don't support emit modes (only LLVM ones do). */
  supportsEmit?: boolean
}): CommandModule {
  const { language, describe, builder, examples, supportsEmit } = input

  registerHelp({
    command: `task compile ${language}`,
    describe,
    options: [
      { long: 'input',     short: 'i', describe: 'Source file (or project root for wasm-pack)' },
      { long: 'output',    short: 'o', describe: 'Output path (default: sibling)' },
      { long: 'optimize',  short: 'O', describe: '0 / 1 / 2 / 3 / s / z' },
      ...(supportsEmit ? [{ long: 'emit',    describe: 'exe (default) | ir | asm | object' }] : []),
      { long: 'extra',                describe: 'Pass-through args (repeatable)' },
    ],
    examples,
  })

  return {
    command: `${language} [input]`,
    describe,
    builder: y => {
      let b = y
        .positional('input', { type: 'string' })
        .option('input',    { alias: 'i', type: 'string' })
        .option('output',   { alias: 'o', type: 'string' })
        .option('optimize', { alias: 'O', type: 'string', choices: ['0','1','2','3','s','z'] as const })
        .option('extra',    { type: 'array', string: true })
      if (supportsEmit) {
        b = b.option('emit', { type: 'string', choices: ['exe','ir','asm','object'] as const })
      }
      return b
    },
    handler: async argv => {
      const { runCompile } = await import('./base')
      const { runAction } = await import('~/code/tool/node/log')
      const opts: CompileOptions = {
        input: (argv.input as string) ?? (argv._[2] as string),
        output: argv.output as string | undefined,
        optimize: argv.optimize as OptLevel | undefined,
        emit: supportsEmit ? (argv.emit as EmitKind | undefined) : undefined,
        extra: argv.extra as string[] | undefined,
      }
      if (!opts.input) throw new Error(`task compile ${language}: input file required`)
      await runAction({
        action: 'compile',
        input: opts as unknown as Record<string, unknown>,
        run: () => runCompile(builder(opts)),
      })
    },
  }
}
