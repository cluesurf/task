/**
 * macOS `dtruss` argv builder. Wraps DTrace with a strace-like
 * surface. Requires `sudo` because System Integrity Protection
 * blocks unprivileged DTrace probes; the runner adds it
 * automatically when invoked.
 */

export type TraceProcessDtrussCommandInput = {
  pid?: number
  command?: string[]
  follow?: boolean
  /** Filter to syscalls matching this glob. */
  match?: string
  /** Print elapsed time per call. */
  elapsed?: boolean
}

export function buildCommandToTraceProcessDtruss(
  input: TraceProcessDtrussCommandInput,
): { bin: 'sudo'; args: string[] } {
  const dtrussArgs: string[] = ['dtruss']
  if (input.follow) dtrussArgs.push('-f')
  if (input.elapsed) dtrussArgs.push('-e')
  if (input.match) dtrussArgs.push('-t', input.match)
  if (input.pid !== undefined) {
    dtrussArgs.push('-p', String(input.pid))
  } else if (input.command && input.command.length > 0) {
    dtrussArgs.push('--', ...input.command)
  } else {
    throw new Error('trace process dtruss: provide either pid or command')
  }
  return { bin: 'sudo', args: dtrussArgs }
}
