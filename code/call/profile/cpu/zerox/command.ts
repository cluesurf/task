/**
 * `0x` (zero-x) — Node.js flamegraph profiler. Spawns a Node
 * process under V8 sampling and emits an interactive HTML
 * flamegraph. Node-only.
 */

export type ProfileCpuZeroxCommandInput = {
  command: string[]
  /** Output dir (default ./<pid>.0x). */
  outputDir?: string
  /** Don't open the browser. */
  quiet?: boolean
}

export function buildCommandToProfileCpuZerox(
  input: ProfileCpuZeroxCommandInput,
): { bin: '0x'; args: string[] } {
  if (!input.command || input.command.length === 0) {
    throw new Error('profile cpu zerox: --command required (Node script + args)')
  }
  const args: string[] = []
  if (input.outputDir) args.push('-o', input.outputDir)
  if (input.quiet) args.push('-q')
  args.push('--', ...input.command)
  return { bin: '0x', args }
}
