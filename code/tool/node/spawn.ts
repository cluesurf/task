/**
 * Thin `spawn` wrapper shared by lightweight verbs whose `node.ts`
 * just needs to shell out to one binary, wait for it, and surface
 * a verb-prefixed error on failure.
 *
 * Consolidates the ~30 copies of this 15-line helper that used to
 * live inline at the bottom of every `code/call/<verb>/<thing>/
 * node.ts` file.
 *
 * For the heavyweight, schema-driven verbs use
 * `runCommandSequence` from `~/code/tool/node/command`; this helper
 * is only for direct, single-process spawns.
 */

import { spawn } from 'node:child_process'
import { formatInstallHint } from '~/code/tool/shared/install-hint'

export type SpawnAndWaitInput = {
  /** Verb label used in error messages: `<verb>: ...`. */
  verb: string
  bin: string
  args: string[]
  env?: NodeJS.ProcessEnv
  /** When true, stdio swallows stdout/stderr. Stderr stays live. */
  quiet?: boolean
  /** When true, inherits all three stdio streams. */
  pipe?: boolean
  /** String to pipe into the child's stdin. */
  stdin?: string
  /** Exit codes to treat as success. Default `[0]`. Use this for
   *  interactive commands (editors) where Ctrl+C-triggered null
   *  exits should resolve rather than reject. */
  okExitCodes?: ReadonlyArray<number | null>
  /** Custom ENOENT hint. Otherwise resolved from
   *  `code/tool/shared/install-hint`. Pass `null` to force no
   *  hint even if the binary is in the registry. */
  installHint?: string | null
}

export async function spawnAndWait(
  input: SpawnAndWaitInput,
): Promise<void> {
  const { verb, bin, args } = input
  return new Promise((resolve, reject) => {
    const stdin =
      input.stdin !== undefined
        ? 'pipe'
        : input.pipe
          ? 'inherit'
          : input.quiet
            ? 'ignore'
            : 'inherit'
    const stdoutErr = input.quiet ? 'ignore' : 'inherit'
    const child = spawn(bin, args, {
      env: input.env,
      stdio: [stdin, stdoutErr, 'inherit'],
    })
    child.on('error', err => {
      reject(spawnError({ ...input, err }))
    })
    const okCodes = input.okExitCodes ?? [0]
    child.on('exit', code => {
      if (okCodes.includes(code)) resolve()
      else
        reject(
          new Error(`${verb}: ${bin} exited with code ${code}`),
        )
    })
    if (input.stdin !== undefined) {
      child.stdin!.end(input.stdin)
    }
  })
}

/**
 * Like `spawnAndWait`, but resolves with the child's exit code
 * instead of throwing on non-zero. Use when the exit code is
 * itself the signal (e.g. `rg` / `fd` returning 1 for "no
 * match", `kubectl diff` returning 1 for "has diff").
 */

export async function spawnAndGetExitCode(
  input: SpawnAndWaitInput,
): Promise<number | null> {
  const { bin, args } = input
  return new Promise((resolve, reject) => {
    const stdin =
      input.stdin !== undefined
        ? 'pipe'
        : input.pipe
          ? 'inherit'
          : input.quiet
            ? 'ignore'
            : 'inherit'
    const stdoutErr = input.quiet ? 'ignore' : 'inherit'
    const child = spawn(bin, args, {
      env: input.env,
      stdio: [stdin, stdoutErr, 'inherit'],
    })
    child.on('error', err => {
      reject(spawnError({ ...input, err }))
    })
    child.on('exit', code => resolve(code))
    if (input.stdin !== undefined) {
      child.stdin!.end(input.stdin)
    }
  })
}

export type SpawnAndCaptureInput = Omit<
  SpawnAndWaitInput,
  'pipe' | 'quiet'
>

/**
 * Like `spawnAndWait`, but captures stdout as a utf-8 string.
 * stdin is closed; stderr stays live.
 */
export async function spawnAndCapture(
  input: SpawnAndCaptureInput,
): Promise<string> {
  const { verb, bin, args } = input
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    const child = spawn(bin, args, {
      env: input.env,
      stdio: ['ignore', 'pipe', 'inherit'],
    })
    child.stdout!.on('data', (b: Buffer) => chunks.push(b))
    child.on('error', err => {
      reject(spawnError({ ...input, err }))
    })
    child.on('exit', code => {
      if (code === 0)
        resolve(Buffer.concat(chunks).toString('utf8'))
      else
        reject(
          new Error(`${verb}: ${bin} exited with code ${code}`),
        )
    })
  })
}

function spawnError(input: {
  verb: string
  bin: string
  installHint?: string | null
  err: unknown
}): Error {
  const code = (input.err as NodeJS.ErrnoException).code
  if (code === 'ENOENT') {
    const resolved = resolveHint(input.bin, input.installHint)
    const hint = resolved ? ` Install: ${resolved}` : ''
    return new Error(
      `${input.verb}: \`${input.bin}\` not found on PATH.${hint}`,
    )
  }
  return new Error(
    `${input.verb}: ${input.bin} failed — ${(input.err as Error).message}`,
  )
}

function resolveHint(
  bin: string,
  override: string | null | undefined,
): string | undefined {
  if (override === null) return undefined
  if (override) return override
  return formatInstallHint(bin)
}
