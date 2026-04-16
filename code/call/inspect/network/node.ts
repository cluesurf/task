/**
 * `task inspect network` — multi-mode:
 *
 *   no host                       → summary (interfaces + listeners + route)
 *   <host> --show dns             → DNS lookup
 *   --connections                 → every open socket + owning process
 *   --listening                   → only LISTEN sockets
 *   --established                 → only ESTABLISHED sockets
 *   --remote [--group ip|domain]  → only sockets with a non-local remote,
 *                                    grouped by IP or reverse-DNS hostname
 *
 * `--watch` re-runs the same command every 2s (Ctrl-C to stop) so
 * you can leave the view running while diagnosing idle traffic.
 */

import tint, { Tint } from '@termsurf/tint-text'
import stripAnsi from 'strip-ansi'
import {
  listInterfaces,
  listRoutes,
  lookupDns,
} from '~/code/tool/node/network/base'
import {
  listConnections,
  groupByRemote,
  only,
  type Connection,
} from '~/code/tool/node/network/connections'
import { listPorts } from '~/code/tool/node/proc/base'
import { getLoggingStyle, isExplaining } from '~/code/tool/node/log'

const KEY: Tint = { tone: 'white' }
const VAL: Tint = { tone: 'whiteBright' }
const HEAD: Tint = { tone: 'whiteBright', bold: true }
const DIM: Tint = { tone: 'blackBright' }
const ACCENT: Tint = { tone: 'cyan' }

export type InspectNetworkNodeInput = {
  host?: string
  show?: string
  connections?: boolean
  listening?: boolean
  established?: boolean
  remote?: boolean
  group?: 'ip' | 'domain' | 'process'
  watch?: boolean
  interval?: number
  /** Glob pattern matched against process name / command. Supports
   * `*` (any run) and `?` (single char). Case-insensitive. */
  filter?: string
}

async function inspectNetworkNode(input: InspectNetworkNodeInput) {
  if (input.watch) return await watchLoop(input)
  return await runOnce(input)
}

async function watchLoop(input: InspectNetworkNodeInput) {
  const interval = (input.interval ?? 2) * 1000
  // Cheap screen-clearing — re-runs in place until Ctrl-C.
  const clear = () => process.stdout.write('\x1b[2J\x1b[H')
  clear()
  await runOnce(input)
  return new Promise<void>(resolve => {
    const timer = setInterval(async () => {
      clear()
      await runOnce(input).catch(() => undefined)
    }, interval)
    process.on('SIGINT', () => {
      clearInterval(timer)
      resolve()
    })
  })
}

async function runOnce(input: InspectNetworkNodeInput) {
  if (input.connections || input.listening || input.established || input.remote) {
    return await inspectSockets(input)
  }
  if (input.host) return await inspectHost(input.host, input.show)
  return await inspectSummary()
}

async function inspectSockets(input: InspectNetworkNodeInput) {
  let conns = await listConnections()
  if (input.listening)   conns = conns.filter(only.listening)
  if (input.established) conns = conns.filter(only.established)
  if (input.remote)      conns = conns.filter(only.remote)
  if (input.filter) {
    const matches = globToMatcher(input.filter)
    conns = conns.filter(c => matches(c.process))
  }

  if (input.group || input.remote) {
    const mode = input.group === 'domain' ? 'domain' : 'ip'
    const groups = await groupByRemote(conns, mode)
    renderGroups(groups, mode)
    return { groups }
  }

  renderConnections(conns)
  return { connections: conns }
}

async function inspectSummary() {
  const ifaces = listInterfaces()
  const [ports, routes] = await Promise.all([
    listPorts().catch(() => []),
    listRoutes().catch(() => []),
  ])
  const listenCount = ports.filter(p => p.status.toLowerCase() === 'listen').length
  const defaultRoute = routes.find(
    r => r.destination === 'default' || r.destination === '0.0.0.0',
  )
  const rows: Array<[string, string]> = [
    ['interfaces', String(ifaces.length)],
    ['listening ports', String(listenCount)],
    [
      'default route',
      defaultRoute ? `${defaultRoute.gateway} (${defaultRoute.interface})` : '(none)',
    ],
  ]
  renderTable('network', rows)
  return { interfaces: ifaces, ports, routes }
}

async function inspectHost(host: string, show: string | undefined) {
  const dnsMatch = show?.match(/^dns(?::(.+))?$/i)
  const types = dnsMatch?.[1]?.split(',').map(s => s.trim())
  const records = await lookupDns(host, types)

  const style = getLoggingStyle()
  if ((style === 'pretty' || style === 'text') && !isExplaining()) {
    const paint = painter(style)
    const out: string[] = ['', paint(host, HEAD), '']
    const widest = records.reduce((m, r) => Math.max(m, r.type.length), 4)
    for (const r of records) {
      out.push(paint(r.type.padEnd(widest), KEY) + '    ' + paint(r.value, VAL))
    }
    if (records.length === 0) out.push(paint('(no records)', KEY))
    out.push('')
    process.stdout.write(out.join('\n') + '\n')
  }
  return { host, records }
}

// ---- renderers ---------------------------------------------------

function renderConnections(conns: Connection[]): void {
  const style = getLoggingStyle()
  if (style !== 'pretty' && style !== 'text') return
  if (isExplaining()) return
  const paint = painter(style)

  const header = [
    pad('PID', 7), pad('PROCESS', 20), pad('PROTO', 6), pad('LOCAL', 24),
    pad('REMOTE', 28), pad('STATE', 12),
  ].join(' ')
  const out: string[] = ['', paint(header, HEAD)]

  for (const c of conns) {
    const local = `${c.localAddr}:${c.localPort ?? '*'}`
    const remote = c.remoteAddr ? `${c.remoteAddr}:${c.remotePort ?? '?'}` : '—'
    const line = [
      pad(String(c.pid), 7),
      pad(truncate(c.process, 20), 20),
      pad(c.protocol, 6),
      pad(truncate(local, 24), 24),
      pad(truncate(remote, 28), 28),
      pad(c.state ?? '', 12),
    ].join(' ')
    out.push(paint(line, VAL))
  }
  if (conns.length === 0) out.push(paint('(none)', DIM))
  out.push('')
  process.stdout.write(out.join('\n') + '\n')
}

function renderGroups(
  groups: { key: string; connections: Connection[]; hostname?: string }[],
  mode: 'ip' | 'domain',
): void {
  const style = getLoggingStyle()
  if (style !== 'pretty' && style !== 'text') return
  if (isExplaining()) return
  const paint = painter(style)

  const out: string[] = ['', paint(`remote endpoints (grouped by ${mode})`, HEAD), '']
  for (const g of groups) {
    const procs = [...new Set(g.connections.map(c => c.process))].join(', ')
    const line =
      paint(pad(g.key, 40), ACCENT) +
      paint(pad(String(g.connections.length), 4), VAL) +
      '  ' +
      paint(procs, DIM)
    out.push(line)
  }
  if (groups.length === 0) out.push(paint('(no remote connections)', DIM))
  out.push('')
  process.stdout.write(out.join('\n') + '\n')
}

function renderTable(title: string, rows: Array<[string, string]>): void {
  const style = getLoggingStyle()
  if (style !== 'pretty' && style !== 'text') return
  if (isExplaining()) return
  const paint = painter(style)
  const widest = rows.reduce((m, [k]) => Math.max(m, k.length), 0)
  const out: string[] = ['', paint(title, HEAD), '']
  for (const [k, v] of rows) {
    out.push(paint(k.padEnd(widest), KEY) + '    ' + paint(v, VAL))
  }
  out.push('')
  process.stdout.write(out.join('\n') + '\n')
}

// ---- util -----------------------------------------------------

function painter(style: string) {
  const color = style === 'pretty'
  return (s: string, t: Tint) => (color ? tint(s, t) : stripAnsi(tint(s, t)))
}
function pad(s: string, n: number): string {
  return s.length >= n ? s : s + ' '.repeat(n - s.length)
}
function truncate(s: string, n: number): string {
  return s.length <= n ? s : s.slice(0, n - 1) + '…'
}

/**
 * Glob → case-insensitive matcher. `*` matches any run (including
 * empty), `?` matches one char. Plain strings with no wildcards
 * behave as substring matches, matching the ergonomics used by
 * `task list process --name`.
 */
function globToMatcher(pattern: string): (s: string) => boolean {
  const p = pattern.toLowerCase()
  if (!p.includes('*') && !p.includes('?')) {
    return s => s.toLowerCase().includes(p)
  }
  const escaped = p.replace(/[.+^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp('^' + escaped.replace(/\*/g, '.*').replace(/\?/g, '.') + '$', 'i')
  return s => regex.test(s)
}

export default inspectNetworkNode
export { inspectNetworkNode }
