import tint, { Tint } from '@termsurf/tint-text'
import stripAnsi from 'strip-ansi'
import { listRoutes } from '~/code/tool/node/network/base'
import { getLoggingStyle } from '~/code/tool/node/log'

const HEAD: Tint = { tone: 'white' }
const CELL: Tint = { tone: 'whiteBright' }

export async function listNetworkRouteNode() {
  const routes = await listRoutes()

  const style = getLoggingStyle()
  if (style === 'pretty' || style === 'text') {
    const color = style === 'pretty'
    const paint = (s: string, t: Tint) =>
      color ? tint(s, t) : stripAnsi(tint(s, t))
    const rows = routes.map(r => [r.destination, r.gateway, r.interface])
    const headers = ['DESTINATION', 'GATEWAY', 'INTERFACE']
    const widths = headers.map((h, i) =>
      Math.max(h.length, ...rows.map(r => (r[i] ?? '').length)),
    )
    const pad = (s: string, w: number) =>
      s.length >= w ? s + ' ' : s + ' '.repeat(w - s.length)
    const line = (cells: string[], tone: Tint) =>
      cells.map((c, i) => paint(pad(c, widths[i]! + 2), tone)).join('')
    const out: string[] = ['', line(headers, HEAD)]
    for (const row of rows) out.push(line(row, CELL))
    out.push('')
    process.stdout.write(out.join('\n') + '\n')
  }

  return { routes }
}
