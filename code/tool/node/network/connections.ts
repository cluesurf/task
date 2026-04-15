/**
 * Socket enumeration + remote-endpoint grouping.
 *
 * Backed by `lsof -i -P -n`, which is on macOS by default and
 * almost every Linux distro. The output columns we rely on:
 *
 *   COMMAND  PID  USER  FD  TYPE  DEVICE  SIZE/OFF  NODE  NAME
 *                                                   ^^^^  ^^^^
 *                                                   TCP/UDP   local->remote (STATE)
 *
 * Parsed into a `Connection[]` that downstream renderers can group
 * by remote IP, process, port, etc.
 */

import dns from 'node:dns/promises'
import { spawn } from 'node:child_process'

export type Connection = {
  process: string
  pid: number
  user: string
  protocol: 'tcp' | 'udp'
  localAddr: string
  localPort: number | null
  remoteAddr: string | null
  remotePort: number | null
  state: string | null    // LISTEN / ESTABLISHED / TIME_WAIT / ...
}

export async function listConnections(): Promise<Connection[]> {
  // `-i` all IP sockets, `-P` no port-number resolve (faster, stable),
  // `-n` no DNS resolve (faster; we reverse-lookup selectively later).
  // Skipped `-T st` (state tag) — some lsof builds reject it and
  // we already parse the state from the NAME column's `(LISTEN)`
  // suffix.
  const raw = await run('lsof', ['-i', '-P', '-n']).catch(() => '')
  const lines = raw.split('\n').slice(1).filter(Boolean)
  const out: Connection[] = []
  for (const line of lines) {
    const cols = line.trim().split(/\s+/)
    if (cols.length < 9) continue
    const [proc, pidStr, user] = cols as [string, string, string, ...string[]]
    const type = cols[4]?.toLowerCase()
    const protocol: 'tcp' | 'udp' | null =
      type === 'tcp' || type === 'ipv4' || type === 'ipv6'
        ? inferProtocolFromRest(cols.slice(7).join(' '))
        : null
    if (!protocol) continue
    const name = cols.slice(8).join(' ')
    const state = extractState(name)
    const [local, remote] = splitEndpoints(name.replace(/\(.*\)$/, '').trim())
    const [localAddr, localPort] = parseEndpoint(local)
    const [remoteAddr, remotePort] = remote ? parseEndpoint(remote) : [null, null]

    out.push({
      process: proc!,
      pid: Number(pidStr),
      user: user!,
      protocol,
      localAddr: localAddr ?? '',
      localPort,
      remoteAddr,
      remotePort,
      state,
    })
  }
  return out
}

function inferProtocolFromRest(rest: string): 'tcp' | 'udp' | null {
  if (/TCP/i.test(rest)) return 'tcp'
  if (/UDP/i.test(rest)) return 'udp'
  return null
}

function extractState(name: string): string | null {
  const m = name.match(/\(([^)]+)\)\s*$/)
  return m ? m[1]! : null
}

function splitEndpoints(s: string): [string, string | null] {
  const parts = s.split('->')
  return [parts[0]!.trim(), parts[1]?.trim() ?? null]
}

function parseEndpoint(s: string): [string | null, number | null] {
  // "127.0.0.1:8080"  /  "*:443"  /  "[::1]:22"
  const m = s.match(/^\[?([^\]]+?)\]?:(\*|\d+)$/)
  if (!m) return [s || null, null]
  const [, addr, portStr] = m
  return [addr!, portStr === '*' ? null : Number(portStr)]
}

// ---- grouping / resolving -------------------------------------

export type RemoteGroup = {
  key: string                      // IP or hostname
  connections: Connection[]
  hostname?: string
}

export async function groupByRemote(
  conns: Connection[],
  mode: 'ip' | 'domain' = 'ip',
): Promise<RemoteGroup[]> {
  const withRemote = conns.filter(c => c.remoteAddr && !isLocal(c.remoteAddr))
  const byIp = new Map<string, Connection[]>()
  for (const c of withRemote) {
    const k = c.remoteAddr!
    if (!byIp.has(k)) byIp.set(k, [])
    byIp.get(k)!.push(c)
  }

  const groups: RemoteGroup[] = []
  for (const [ip, list] of byIp) {
    const g: RemoteGroup = { key: ip, connections: list }
    if (mode === 'domain') {
      g.hostname = await reverseLookup(ip)
      if (g.hostname) g.key = g.hostname
    }
    groups.push(g)
  }
  // Stable sort by connection count, then key.
  groups.sort(
    (a, b) => b.connections.length - a.connections.length || a.key.localeCompare(b.key),
  )
  return groups
}

async function reverseLookup(ip: string): Promise<string | undefined> {
  try {
    const names = await dns.reverse(ip)
    return names[0]
  } catch {
    return undefined
  }
}

function isLocal(addr: string): boolean {
  return (
    addr === '*' ||
    addr === '0.0.0.0' ||
    addr === '::' ||
    addr.startsWith('127.') ||
    addr === '::1' ||
    addr.startsWith('fe80:')
  )
}

// ---- filters --------------------------------------------------

export const only = {
  listening: (c: Connection) => c.state === 'LISTEN',
  established: (c: Connection) => c.state === 'ESTABLISHED',
  remote: (c: Connection) => !!c.remoteAddr && !isLocal(c.remoteAddr),
}

// ---- runner ---------------------------------------------------

function run(cmd: string, args: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    const child = spawn(cmd, args, { stdio: ['ignore', 'pipe', 'ignore'] })
    child.stdout!.on('data', (b: Buffer) => chunks.push(b))
    child.on('error', err => {
      reject(new Error(
        (err as NodeJS.ErrnoException).code === 'ENOENT'
          ? `network: \`${cmd}\` not found on PATH`
          : `network: ${cmd} failed — ${err.message}`,
      ))
    })
    child.on('exit', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })
}
