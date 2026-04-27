/**
 * `clinic` (NearForm Clinic.js) — multi-tool Node performance
 * profiler. The CPU subtool is `clinic flame` which emits an
 * interactive flamegraph. Node-only.
 */

export type ProfileCpuClinicCommandInput = {
  command: string[]
  /** Subtool: flame (default) | doctor | bubbleprof | heapprofiler */
  tool?: 'flame' | 'doctor' | 'bubbleprof' | 'heapprofiler'
  /** Override output dir. */
  outputDir?: string
}

export function buildCommandToProfileCpuClinic(
  input: ProfileCpuClinicCommandInput,
): { bin: 'clinic'; args: string[] } {
  if (!input.command || input.command.length === 0) {
    throw new Error('profile cpu clinic: --command required (Node script + args)')
  }
  const tool = input.tool ?? 'flame'
  const args: string[] = [tool]
  if (input.outputDir) args.push('--dest', input.outputDir)
  args.push('--', ...input.command)
  return { bin: 'clinic', args }
}
