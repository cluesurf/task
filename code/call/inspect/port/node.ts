import tint, { Tint } from '@termsurf/tint-text'
import stripAnsi from 'strip-ansi'
import {
  listPorts,
  listProcesses,
  type Process,
} from '~/code/tool/node/proc/base'
import { renderProcesses } from '~/code/tool/node/proc/render'
import { getLoggingStyle } from '~/code/tool/node/log'

const KEY: Tint = { tone: 'white' }
const VAL: Tint = { tone: 'whiteBright' }
const HEAD: Tint = { tone: 'whiteBright', bold: true }

export type InspectPortNodeInput = { port: number; show?: string }

export async function inspectPortNode(input: InspectPortNodeInput) {
  const [ports, procs] = await Promise.all([listPorts(), listProcesses()])
  const owners = ports.filter(p => p.port === input.port)
  const uniquePids = Array.from(new Set(owners.map(o => o.pid)))
  const processes: Process[] = uniquePids
    .map(pid => procs.find(p => p.pid === pid))
    .filter((p): p is Process => !!p)

  const style = getLoggingStyle()
  if (style === 'pretty' || style === 'text') {
    const color = style === 'pretty'
    const paint = (s: string, t: Tint) =>
      color ? tint(s, t) : stripAnsi(tint(s, t))
    const out: string[] = ['', paint(`port ${input.port}`, HEAD), '']

    if (owners.length === 0) {
      out.push(paint('status', KEY) + '    ' + paint('nothing listening', VAL))
      out.push('')
      process.stdout.write(out.join('\n') + '\n')
      return { port: input.port, owners: [], processes: [] }
    }

    const rows: Array<[string, string]> = []
    for (const o of owners) {
      rows.push([`${o.protocol}`, `${o.status || '-'} — ${o.command} (pid ${o.pid}, ${o.user})`])
    }
    const widest = rows.reduce((m, [k]) => Math.max(m, k.length), 0)
    for (const [k, v] of rows) {
      out.push(paint(k.padEnd(widest), KEY) + '    ' + paint(v, VAL))
    }
    out.push('')
    process.stdout.write(out.join('\n') + '\n')

    const wants = new Set((input.show ?? '').split(',').map(s => s.trim()))
    if (wants.has('process') && processes.length > 0) {
      process.stdout.write(paint('processes', HEAD) + '\n')
      process.stdout.write(renderProcesses(processes, color) + '\n')
    }
  }

  return { port: input.port, owners, processes }
}
