/**
 * Run a resolved plan: spawn the command via `sh -c` so shell
 * metacharacters (pipes, `$()`, etc.) in registry commands work
 * as written. Stream stdio to the caller's terminal. Exit code
 * propagates.
 */

import { spawn } from 'node:child_process'
import { resolve as resolvePlan, type ResolveOptions } from './plan'
import type { Plan, TaskVerb } from './types'

export type RunOptions = ResolveOptions & {
  /** Print the resolved command before running. */
  explain?: boolean
  /** Skip execution; just print the command. */
  dryRun?: boolean
  /** Extra args appended after the resolved command. */
  args?: string[]
}

export type RunResult = {
  plan: Plan
  exitCode: number | null
}

export async function run(opts: RunOptions): Promise<RunResult> {
  const plan = resolvePlan(opts)
  if (!plan) {
    throw new Error(
      `task ${opts.verb}: could not infer a command for this repo. ` +
      `Drop a \`.taskrc\` to set one, or use \`task project call <cmd>\`.`,
    )
  }

  const full = opts.args?.length
    ? `${plan.command} ${opts.args.map(shellEscape).join(' ')}`
    : plan.command

  if (opts.explain || opts.dryRun) {
    process.stdout.write(
      `[${plan.source}:${plan.ecosystem}] ${full}\n`,
    )
    if (opts.dryRun) return { plan, exitCode: 0 }
  }

  return await spawnShell(full, opts.cwd).then(code => ({ plan, exitCode: code }))
}

export async function callCommand(
  cwd: string,
  command: string,
  args: string[] = [],
): Promise<number | null> {
  const full = args.length
    ? `${command} ${args.map(shellEscape).join(' ')}`
    : command
  return await spawnShell(full, cwd)
}

function spawnShell(cmd: string, cwd: string): Promise<number | null> {
  return new Promise((res, rej) => {
    // `sh -c "cmd"` lets registry entries use pipes, `$()`, `&&`
    // without us having to parse them. Windows users get a
    // cmd.exe-based fallback; for now we require a POSIX-ish shell
    // (macOS/Linux, or WSL/git-bash on Windows).
    const child = spawn('sh', ['-c', cmd], {
      cwd,
      stdio: 'inherit',
      env: process.env,
    })
    child.on('error', rej)
    child.on('exit', (code) => res(code))
  })
}

function shellEscape(s: string): string {
  if (!/[^A-Za-z0-9_./=:@%+-]/.test(s)) return s
  return `'${s.replace(/'/g, `'\\''`)}'`
}
