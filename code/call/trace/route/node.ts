import tint, { Tint } from '@termsurf/tint-text'
import stripAnsi from 'strip-ansi'
import { tracerouteHost } from '~/code/tool/node/network/make'
import { getLoggingStyle } from '~/code/tool/node/log'

const HEAD: Tint = { tone: 'white' }
const CELL: Tint = { tone: 'whiteBright' }
const DIM: Tint = { tone: 'white' }

export type TraceRouteNodeInput = { host: string; maxHops: number }

async function traceRouteNode(input: TraceRouteNodeInput) {
  const hops = await tracerouteHost(input.host, input.maxHops)

  const style = getLoggingStyle()
  if (style === 'pretty' || style === 'text') {
    const color = style === 'pretty'
    const paint = (s: string, t: Tint) =>
      color ? tint(s, t) : stripAnsi(tint(s, t))
    const rows: string[][] = hops.map(h => [
      String(h.hop),
      h.host,
      h.ip ?? '',
      h.avgMs !== undefined ? `${h.avgMs} ms` : '*',
    ])
    const headers = ['HOP', 'HOST', 'IP', 'AVG']
    const widths = headers.map((h, i) =>
      Math.max(h.length, ...rows.map(r => (r[i] ?? '').length)),
    )
    const pad = (s: string, w: number) =>
      s.length >= w ? s + ' ' : s + ' '.repeat(w - s.length)
    const line = (cells: string[], tone: Tint) =>
      cells.map((c, i) => paint(pad(c, widths[i]! + 2), tone)).join('')
    const out: string[] = ['', line(headers, HEAD)]
    for (const row of rows) out.push(line(row, CELL))
    out.push('', paint(`${hops.length} hops`, DIM), '')
    process.stdout.write(out.join('\n') + '\n')
  }

  return { host: input.host, hops }
}

export default traceRouteNode
export { traceRouteNode }
