/**
 * `samply` (cross-platform sampling profiler, Rust). Wraps a
 * command and emits a Firefox Profiler-compatible JSON. Works
 * on macOS / Linux / Windows; the report URL it prints opens in
 * any browser.
 */

export type ProfileCpuSamplyCommandInput = {
  pid?: number
  command?: string[]
  /** Sampling rate in Hz. */
  rate?: number
  /** Output `.json.gz`. Otherwise samply chooses one. */
  output?: string
  /** Don't open a browser at the end. */
  noOpen?: boolean
  /** Save the report to disk instead of opening a server. */
  saveOnly?: boolean
}

export function buildCommandToProfileCpuSamply(
  input: ProfileCpuSamplyCommandInput,
): { bin: 'samply'; args: string[] } {
  const args: string[] = []
  if (input.pid !== undefined) {
    args.push('record', '--pid', String(input.pid))
  } else if (input.command && input.command.length > 0) {
    args.push('record')
  } else {
    throw new Error('profile cpu samply: provide either pid or command')
  }
  if (input.rate) args.push('--rate', String(input.rate))
  if (input.output) args.push('--save-only', '--output', input.output)
  else if (input.saveOnly) args.push('--save-only')
  if (input.noOpen) args.push('--no-open')
  if (input.command && input.pid === undefined) args.push('--', ...input.command)
  return { bin: 'samply', args }
}
