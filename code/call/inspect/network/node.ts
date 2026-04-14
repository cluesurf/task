/**
 * `task inspect network` — dual-mode:
 *
 *   no host           → summary (interfaces + listening port count +
 *                       default route)
 *   <host> --show dns → DNS lookup for the given host
 */

import tint, { Tint } from '@termsurf/tint-text'
import stripAnsi from 'strip-ansi'
import {
  listInterfaces,
  listRoutes,
  lookupDns,
} from '~/code/tool/node/network/base'
import { listPorts } from '~/code/tool/node/proc/base'
import { getLoggingStyle, isExplaining } from '~/code/tool/node/log'

const KEY: Tint = { tone: 'white' }
const VAL: Tint = { tone: 'whiteBright' }
const HEAD: Tint = { tone: 'whiteBright', bold: true }

export type InspectNetworkNodeInput = {
  host?: string
  show?: string
}

export async function inspectNetworkNode(input: InspectNetworkNodeInput) {
  if (input.host) {
    return await inspectHost(input.host, input.show)
  }
  return await inspectSummary()
}

async function inspectSummary() {
  const ifaces = listInterfaces()
  const [ports, routes] = await Promise.all([
    listPorts().catch(() => []),
    listRoutes().catch(() => []),
  ])
  const listenCount = ports.filter(
    p => p.status.toLowerCase() === 'listen',
  ).length
  const defaultRoute = routes.find(
    r => r.destination === 'default' || r.destination === '0.0.0.0',
  )

  const rows: Array<[string, string]> = [
    ['interfaces', String(ifaces.length)],
    ['listening ports', String(listenCount)],
    [
      'default route',
      defaultRoute
        ? `${defaultRoute.gateway} (${defaultRoute.interface})`
        : '(none)',
    ],
  ]
  render('network', rows)
  return { interfaces: ifaces, ports, routes }
}

async function inspectHost(host: string, show: string | undefined) {
  // `--show dns` or `--show dns:A,MX,TXT` both trigger a DNS
  // lookup. Without a colon-suffix we fetch the default record
  // set; with one we fetch only the named types.
  const dnsMatch = show?.match(/^dns(?::(.+))?$/i)
  const types = dnsMatch?.[1]?.split(',').map(s => s.trim())
  const records = await lookupDns(host, types)

  const style = getLoggingStyle()
  if ((style === 'pretty' || style === 'text') && !isExplaining()) {
    const color = style === 'pretty'
    const paint = (s: string, t: Tint) =>
      color ? tint(s, t) : stripAnsi(tint(s, t))
    const out: string[] = ['', paint(host, HEAD), '']
    const widest = records.reduce((m, r) => Math.max(m, r.type.length), 4)
    for (const r of records) {
      out.push(paint(r.type.padEnd(widest), KEY) + '    ' + paint(r.value, VAL))
    }
    if (records.length === 0) {
      out.push(paint('(no records)', KEY))
    }
    out.push('')
    process.stdout.write(out.join('\n') + '\n')
  }
  return { host, records }
}

function render(title: string, rows: Array<[string, string]>): void {
  const style = getLoggingStyle()
  if (style !== 'pretty' && style !== 'text') return
  if (isExplaining()) return
  const color = style === 'pretty'
  const paint = (s: string, t: Tint) =>
    color ? tint(s, t) : stripAnsi(tint(s, t))
  const widest = rows.reduce((m, [k]) => Math.max(m, k.length), 0)
  const out: string[] = ['', paint(title, HEAD), '']
  for (const [k, v] of rows) {
    out.push(paint(k.padEnd(widest), KEY) + '    ' + paint(v, VAL))
  }
  out.push('')
  process.stdout.write(out.join('\n') + '\n')
}
