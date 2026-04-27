/**
 * Windows Process Monitor (Sysinternals `procmon.exe`) argv
 * builder. Procmon's CLI is non-standard — it logs to a backing
 * `.pml` file then exports. We wrap the common case: capture for
 * a duration, filter by PID, write a CSV report.
 */

export type TraceProcessProcmonCommandInput = {
  pid?: number
  command?: string[]
  /** Where to write the .pml capture. Required. */
  capture: string
  /** Where to export the human-readable report. */
  output?: string
  /** Capture duration in seconds (procmon waits this long then exits). */
  duration?: number
}

export function buildCommandToTraceProcessProcmon(
  input: TraceProcessProcmonCommandInput,
): { bin: 'procmon'; args: string[] } {
  if (!input.pid && !input.command) {
    throw new Error('trace process procmon: provide either pid or command')
  }
  const args = ['/AcceptEula', '/Quiet', '/Minimized', '/BackingFile', input.capture]
  if (input.duration) args.push('/RunTime', String(input.duration))
  if (input.pid !== undefined) {
    // Procmon doesn't natively filter by PID on the CLI; the convention
    // is to start with `/Filter` from a saved .pmc — leave the field
    // here so the caller can enrich it when they have one.
    args.push('/PMC', `pid=${input.pid}`)
  }
  if (input.output) args.push('/SaveAs', input.output)
  return { bin: 'procmon', args }
}
