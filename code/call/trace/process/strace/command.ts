/**
 * Linux `strace` argv builder. Supports both attach-by-PID and
 * launch-and-trace modes. Summary mode (`-c`) is the most useful
 * default for "what's this process doing" since it produces a
 * sortable per-syscall count + timing table.
 */

export type TraceProcessStraceCommandInput = {
  pid?: number
  command?: string[]
  /** Print a syscall summary instead of every call. */
  summary?: boolean
  /** Restrict to one or more syscall names (`open,read,write`). */
  syscalls?: string
  /** Follow forks. */
  follow?: boolean
  /** Output file (otherwise stderr). */
  output?: string
  /** Show timestamps. */
  timestamps?: boolean
}

export function buildCommandToTraceProcessStrace(
  input: TraceProcessStraceCommandInput,
): { bin: 'strace'; args: string[] } {
  const args: string[] = []
  if (input.summary) args.push('-c')
  if (input.follow) args.push('-f')
  if (input.timestamps) args.push('-tt')
  if (input.syscalls) args.push('-e', `trace=${input.syscalls}`)
  if (input.output) args.push('-o', input.output)
  if (input.pid !== undefined) {
    args.push('-p', String(input.pid))
  } else if (input.command && input.command.length > 0) {
    args.push('--', ...input.command)
  } else {
    throw new Error('trace process strace: provide either pid or command')
  }
  return { bin: 'strace', args }
}
