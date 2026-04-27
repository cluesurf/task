/**
 * Orchestrator: pick a runner, build the command, spawn it.
 *
 *   import { runUnifiedTest } from '~/code/tool/node/test-runner/run'
 *   await runUnifiedTest({
 *     cwd: process.cwd(),
 *     runner: 'pytest',
 *     filter: 'login',
 *     coverage: true,
 *   })
 */

import { spawn } from 'node:child_process'
import { TEST_RUNNERS, findRunnerById } from './registry'
import type {
  TestOptions,
  TestPlan,
  TestRunner,
  TestRunnerId,
} from './types'

export type RunUnifiedTestOptions = TestOptions & {
  cwd: string
  /** Pin a specific runner. When unset, auto-detect by inspecting cwd. */
  runner?: TestRunnerId
}

export type RunUnifiedTestResult = {
  plan: TestPlan
  exitCode: number | null
}

export async function runUnifiedTest(
  opts: RunUnifiedTestOptions,
): Promise<RunUnifiedTestResult> {
  const plan = planUnifiedTest(opts)

  if (opts.explain || opts.dryRun) {
    process.stdout.write(`[${plan.runner}] ${plan.command}\n`)
    if (opts.dryRun) return { plan, exitCode: 0 }
  }

  const exitCode = await spawnShell(plan.command, opts.cwd)
  return { plan, exitCode }
}

export function planUnifiedTest(opts: RunUnifiedTestOptions): TestPlan {
  const runner = pickRunner(opts)
  if (!runner) {
    const known = TEST_RUNNERS.map(r => r.id).join(', ')
    throw new Error(
      `task test: could not detect a test runner in this directory. ` +
        `Pass --runner <id> (one of: ${known}) or drop a config file ` +
        `(jest.config.ts, vitest.config.ts, pytest.ini, Cargo.toml, ` +
        `go.mod, Package.swift, .rspec, phpunit.xml, ...).`,
    )
  }

  return {
    runner: runner.id,
    name: runner.name,
    command: runner.build(opts),
  }
}

function pickRunner(opts: RunUnifiedTestOptions): TestRunner | undefined {
  if (opts.runner) return findRunnerById(opts.runner)
  return TEST_RUNNERS.find(r => r.detect(opts.cwd))
}

function spawnShell(cmd: string, cwd: string): Promise<number | null> {
  return new Promise((res, rej) => {
    const child = spawn('sh', ['-c', cmd], {
      cwd,
      stdio: 'inherit',
      env: process.env,
    })
    child.on('error', rej)
    child.on('exit', code => res(code))
  })
}
