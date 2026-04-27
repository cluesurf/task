/**
 * `task test code` — unified driver across jest, vitest,
 * mocha, pytest, cargo test, go test, swift test, xctest,
 * rspec, and phpunit.
 *
 * The shared flag set (`--filter`, `--watch`, `--coverage`,
 * `--reporter`, `--bail`, `--workers`, `--update-snapshots`)
 * gets translated into the picked runner's native argv.
 * Detection inspects `package.json` deps, language manifests
 * (`Cargo.toml`, `go.mod`, `Package.swift`, ...), and
 * runner-specific config files (`pytest.ini`, `.rspec`,
 * `phpunit.xml`, ...). When detection fails we fall back to
 * the ecosystem-based zero-config runner (the
 * `buildProjectVerbConsole` path) so `pnpm test` / etc.
 * still work for projects whose test runner doesn't match
 * any of the ten supported here.
 */

import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'
import { runAction } from '~/code/tool/node/log'
import { TEST_RUNNERS } from '~/code/tool/node/test-runner/registry'
import {
  planUnifiedTest,
  runUnifiedTest,
} from '~/code/tool/node/test-runner/run'
import type {
  TestOptions,
  TestRunnerId,
} from '~/code/tool/node/test-runner/types'

const RUNNER_IDS = TEST_RUNNERS.map(r => r.id) as TestRunnerId[]

registerHelp({
  command: 'task test code',
  describe:
    'Unified driver for jest, vitest, mocha, pytest, cargo test, go test, swift test, xctest, rspec, phpunit.',
  options: [
    { long: 'runner', short: 'r', describe: `Pin runner: ${RUNNER_IDS.join(', ')}` },
    { long: 'filter', short: 'k', describe: 'Filter test names (per-runner pattern)' },
    { long: 'watch',                describe: 'Re-run on change (where supported)' },
    { long: 'coverage',             describe: 'Collect coverage' },
    { long: 'reporter',             describe: 'default | junit | tap | json' },
    { long: 'reporter-output',      describe: 'Output path for junit/json reporters' },
    { long: 'bail',                 describe: 'Stop on first failure' },
    { long: 'workers',              describe: 'Parallel worker count' },
    { long: 'update-snapshots', short: 'u', describe: 'Update snapshot fixtures' },
    { long: 'explain',              describe: 'Print the resolved command before running' },
    { long: 'dry-run',              describe: 'Print the command but do not run it' },
  ],
  examples: [
    { comment: 'auto-detect runner, run all tests',
      command: 'task test code' },
    { comment: 'jest with a name filter',
      command: 'task test code --filter login' },
    { comment: 'pytest with coverage and a 4-worker fanout',
      command: 'task test code --runner pytest --coverage --workers 4' },
    { comment: 'cargo test, output JUnit XML',
      command: 'task test code --runner cargo --reporter junit' },
    { comment: 'forward extra flags after `--`',
      command: 'task test code -- --some-runner-flag' },
  ],
})

export const testCodeConsole: CommandModule = {
  command: 'code',
  describe:
    'Unified driver for jest, vitest, mocha, pytest, cargo test, go test, swift test, xctest, rspec, phpunit.',
  builder: y =>
    y
      .option('runner', {
        alias: 'r',
        type: 'string',
        choices: RUNNER_IDS,
      })
      .option('filter', { alias: 'k', type: 'string' })
      .option('watch', { type: 'boolean' })
      .option('coverage', { type: 'boolean' })
      .option('reporter', {
        type: 'string',
        choices: ['default', 'junit', 'tap', 'json'] as const,
      })
      .option('reporter-output', { type: 'string' })
      .option('bail', { type: 'boolean' })
      .option('workers', { type: 'number' })
      .option('update-snapshots', { alias: 'u', type: 'boolean' })
      .option('explain', { type: 'boolean' })
      .option('dry-run', { type: 'boolean' })
      .strictOptions(false)
      .parserConfiguration({
        'unknown-options-as-args': true,
      } as never),
  handler: async argv => {
    const positionals = (argv._ as Array<string | number>)
      .slice(2)
      .map(String)

    const opts = {
      cwd: process.cwd(),
      runner: argv.runner as TestRunnerId | undefined,
      filter: argv.filter as string | undefined,
      watch: argv.watch as boolean | undefined,
      coverage: argv.coverage as boolean | undefined,
      reporter: argv.reporter as TestOptions['reporter'],
      reporterOutput: argv['reporter-output'] as string | undefined,
      bail: argv.bail as boolean | undefined,
      workers: argv.workers as number | undefined,
      updateSnapshots: argv['update-snapshots'] as boolean | undefined,
      explain: argv.explain as boolean | undefined,
      dryRun: argv['dry-run'] as boolean | undefined,
      passthrough: positionals,
    }

    const useUnified = canUseUnifiedDriver(opts)

    await runAction({
      action: 'test',
      input: opts as unknown as Record<string, unknown>,
      run: async () => {
        if (useUnified) {
          // Pre-plan to surface "could not detect runner" before
          // we shell out — gives a clearer error than letting the
          // shell echo it.
          planUnifiedTest(opts)
          const r = await runUnifiedTest(opts)
          if (r.exitCode !== 0 && r.exitCode !== null) {
            throw new Error(
              `task test: ${r.plan.runner} exited with code ${r.exitCode}`,
            )
          }
          return r
        }
        // No unified runner detected and the user didn't pin one —
        // fall through to the ecosystem-based project runner.
        const { run } = await import('~/code/tool/node/runner/run')
        const r = await run({
          cwd: opts.cwd,
          verb: 'test',
          explain: opts.explain,
          dryRun: opts.dryRun,
          args: opts.passthrough,
        })
        if (r.exitCode !== 0 && r.exitCode !== null) {
          throw new Error(
            `task test: ${r.plan.ecosystem} exited with code ${r.exitCode}`,
          )
        }
        return r
      },
    })
  },
}

/**
 * The unified driver wins if the user pinned a runner OR a
 * unified flag is set OR detection finds one. Otherwise we
 * defer to the ecosystem runner so existing `pnpm test` /
 * `make test` flows aren't disturbed.
 */
function canUseUnifiedDriver(opts: {
  cwd: string
  runner?: TestRunnerId
  filter?: string
  watch?: boolean
  coverage?: boolean
  reporter?: TestOptions['reporter']
  reporterOutput?: string
  bail?: boolean
  workers?: number
  updateSnapshots?: boolean
}): boolean {
  if (opts.runner) return true
  const wantsUnifiedFlag =
    opts.filter !== undefined ||
    opts.watch ||
    opts.coverage ||
    opts.reporter !== undefined ||
    opts.reporterOutput !== undefined ||
    opts.bail ||
    opts.workers !== undefined ||
    opts.updateSnapshots
  if (wantsUnifiedFlag) return true
  return TEST_RUNNERS.some(r => r.detect(opts.cwd))
}
