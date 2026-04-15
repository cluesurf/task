/**
 * Shared yargs builder for the zero-config `task project <verb>`
 * subcommands. Each verb is a 10-line thin console that calls
 * this factory.
 */

import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'
import type { TaskVerb } from '~/code/tool/node/runner/types'

export function buildProjectVerbConsole(input: {
  verb: TaskVerb
  describe: string
  examples?: Array<{ comment: string; command: string }>
  /** Yargs `command` field. Defaults to the verb name so the
   * `task project <verb>` group keeps its existing shape. The new
   * `task <verb> code` shape passes `command: 'code'` to mount as
   * a subcommand of the top-level verb instead. */
  command?: string
  /** Help-registry path. Defaults to `task project <verb>`. */
  helpCommand?: string
}): CommandModule {
  const { verb, describe, examples } = input
  const cmdName = input.command ?? verb
  const helpPath = input.helpCommand ?? `task project ${verb}`

  registerHelp({
    command: helpPath,
    describe,
    options: [
      { long: 'ecosystem', short: 'e', describe: 'Pin to an ecosystem id (e.g. cargo, pnpm, docker)' },
      { long: 'explain',               describe: 'Print the resolved command before running' },
      { long: 'dry-run',               describe: 'Print the command but do not run it' },
    ],
    examples: examples ?? [{
      comment: `infer and run in the current directory`,
      command: `task project ${verb}`,
    }, {
      comment: 'force an ecosystem (polyglot repo)',
      command: `task project ${verb} -e cargo`,
    }, {
      comment: 'see what would run',
      command: `task project ${verb} --dry-run`,
    }],
  })

  return {
    command: cmdName,
    describe,
    builder: y => y
      .option('ecosystem', { alias: 'e', type: 'string' })
      .option('explain',   { type: 'boolean' })
      .option('dry-run',   { type: 'boolean' })
      // everything after `--` is forwarded to the underlying cmd
      .strictOptions(false)
      .parserConfiguration({ 'unknown-options-as-args': true } as never),
    handler: async argv => {
      const { run } = await import('~/code/tool/node/runner/run')
      const { runAction } = await import('~/code/tool/node/log')
      // Anything after `--` lands in argv._; skip `project` + verb.
      const positionals = (argv._ as Array<string | number>)
        .slice(2)
        .map(String)
      const opts = {
        cwd: process.cwd(),
        verb,
        ecosystem: argv.ecosystem as string | undefined,
        explain: argv.explain as boolean | undefined,
        dryRun: argv['dry-run'] as boolean | undefined,
        args: positionals,
      }
      await runAction({
        action: verb,
        input: opts as unknown as Record<string, unknown>,
        run: async () => {
          const r = await run(opts)
          if (r.exitCode !== 0 && r.exitCode !== null) {
            throw new Error(`task ${verb}: ${r.plan.ecosystem} exited with code ${r.exitCode}`)
          }
          return r
        },
      })
    },
  }
}
