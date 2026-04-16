/**
 * Core process / port data layer for `task list|halt|watch|inspect
 * process` and friends.
 *
 * Strategy — shell out to the OS tools that always give the
 * richest view:
 *
 *   `ps`    →  the process table (pid, ppid, user, cpu, mem, cmd)
 *   `lsof`  →  port ↔ pid mapping (and file handles per pid)
 *
 * No new npm dependency. Everything gets normalized into the
 * `Process` shape below so downstream code (filter, sort, group,
 * tree) doesn't care where the raw bytes came from.
 *
 * Kill operations go through `process.kill` so we don't shell out
 * just to signal a pid.
 */

import { exec } from '~/code/tool/node/process'

export type Process = {
  pid: number
  ppid: number
  user: string
  cpu: number
  memory: number
  rss: number
  name: string
  command: string
}

export type PortRow = {
  pid: number
  command: string
  user: string
  protocol: string
  port: number
  status: string
}

// ---- ps ------------------------------------------------------------

/**
 * Read the entire process table. ps's `comm` field already
 * shortens to the binary's basename, which is what `--text` and
 * `--group name` want; full command stays under `command` for
 * callers that need it.
 */
export async function listProcesses(): Promise<Process[]> {
  const { stdout } = await exec([
    'ps',
    '-axww',
    '-o',
    'pid=,ppid=,user=,pcpu=,pmem=,rss=,comm=,command=',
  ])
  const lines = stdout.split('\n').filter(l => l.trim().length > 0)
  const rows: Process[] = []
  for (const line of lines) {
    // Split the first 7 columns; everything after column 7 is the
    // full command, which can contain spaces.
    const match = line.trim().match(
      /^(\d+)\s+(\d+)\s+(\S+)\s+([\d.]+)\s+([\d.]+)\s+(\d+)\s+(\S+)\s+(.*)$/,
    )
    if (!match) continue
    const [, pid, ppid, user, cpu, mem, rss, , command] = match
    rows.push({
      pid: Number(pid),
      ppid: Number(ppid),
      user: user!,
      cpu: Number(cpu),
      memory: Number(mem),
      rss: Number(rss), // KB on macOS, KB on Linux — consistent
      // `ps -o comm` truncates to 16 chars on macOS (Vi, Go, ...).
      // Derive the real name from the full command path instead.
      name: deriveName(command!),
      command: command!,
    })
  }
  return rows
}

function basename(p: string): string {
  const slash = p.lastIndexOf('/')
  return slash >= 0 ? p.slice(slash + 1) : p
}

/**
 * Pull a human process name out of the full command line. On
 * macOS, `ps` joins argv with single spaces and paths like
 * `/Applications/Visual Studio Code.app/…` contain literal
 * spaces — splitting on whitespace breaks the path. Match the
 * `.app` bundle anywhere in the string first so "Visual Studio
 * Code" survives. If no `.app`, fall back to the first token's
 * basename.
 */
function deriveName(command: string): string {
  const appMatch = command.match(/\/([^/]+)\.app\//)
  if (appMatch) return appMatch[1]!
  const first = command.split(/\s+/)[0] ?? command
  return basename(first)
}

// ---- lsof: ports ---------------------------------------------------

/**
 * Open network sockets with pid, user, protocol, port, and
 * LISTEN/ESTABLISHED status. Parsed from `lsof -nP -iTCP -iUDP`
 * so we don't depend on `ss` (Linux-only) or `netstat` (gone
 * from modern macOS defaults).
 */
export async function listPorts(): Promise<PortRow[]> {
  const { stdout } = await exec(['lsof', '-nP', '-iTCP', '-iUDP'])
  const lines = stdout.split('\n').slice(1).filter(l => l.trim().length > 0)
  const rows: PortRow[] = []
  for (const line of lines) {
    // Columns: COMMAND PID USER FD TYPE DEVICE SIZE/OFF NODE NAME
    const cols = line.split(/\s+/)
    if (cols.length < 9) continue
    const [command, pid, user, , , , , proto, ...rest] = cols
    const name = rest.join(' ')
    // NAME example:  *:3000 (LISTEN)     |  127.0.0.1:55080->1.2.3.4:443 (ESTABLISHED)
    const localMatch = name.match(/^([^ ]+?):(\d+|\*)/)
    const statusMatch = name.match(/\((\w+)\)/)
    if (!localMatch) continue
    const portRaw = localMatch[2]
    if (portRaw === '*') continue
    rows.push({
      pid: Number(pid),
      command: command!,
      user: user!,
      protocol: proto!,
      port: Number(portRaw),
      status: statusMatch?.[1] ?? '',
    })
  }
  return rows
}

// ---- filtering / searching ----------------------------------------

/**
 * Ranked fuzzy match via fuse.js. Name is weighted higher than
 * command so `task list process --text node` surfaces the
 * `node` binaries ahead of processes that only mention node in
 * a long argv. Returns in relevance order, best match first.
 */
export async function filterByText(
  list: Process[],
  text: string,
): Promise<Process[]> {
  const { default: Fuse } = await import('fuse.js')
  const fuse = new Fuse(list, {
    keys: [
      { name: 'name', weight: 0.7 },
      { name: 'command', weight: 0.3 },
    ],
    threshold: 0.4,
    ignoreLocation: true,
  })
  return fuse.search(text).map(r => r.item)
}

export function filterByUser(list: Process[], user: string): Process[] {
  return list.filter(p => p.user === user)
}

// ---- sorting / top / group ----------------------------------------

export type SortKey = 'cpu' | 'memory' | 'rss' | 'pid' | 'name' | 'user'
export type Direction = 'increasing' | 'decreasing'

export function sortProcesses(
  list: Process[],
  key: SortKey,
  direction: Direction = 'decreasing',
): Process[] {
  const sign = direction === 'decreasing' ? -1 : 1
  const sorted = [...list].sort((a, b) => {
    const av = a[key]
    const bv = b[key]
    if (typeof av === 'number' && typeof bv === 'number') return sign * (av - bv)
    return sign * String(av).localeCompare(String(bv))
  })
  return sorted
}

export function topProcesses(
  list: Process[],
  key: 'cpu' | 'memory' | 'rss',
  limit = 10,
): Process[] {
  return sortProcesses(list, key).slice(0, limit)
}

export function groupBy(
  list: Process[],
  key: 'name' | 'user',
): Array<{
  key: string
  count: number
  cpu: number
  memory: number
  rss: number
  pids: number[]
}> {
  const groups = new Map<
    string,
    { key: string; count: number; cpu: number; memory: number; rss: number; pids: number[] }
  >()
  for (const p of list) {
    const k = p[key]
    let g = groups.get(k)
    if (!g) {
      g = { key: k, count: 0, cpu: 0, memory: 0, rss: 0, pids: [] }
      groups.set(k, g)
    }
    g.count += 1
    g.cpu += p.cpu
    g.memory += p.memory
    g.rss += p.rss
    g.pids.push(p.pid)
  }
  return [...groups.values()].sort((a, b) => b.cpu - a.cpu)
}

// ---- tree ----------------------------------------------------------

export type ProcessTreeNode = Process & { children: ProcessTreeNode[] }

export function buildTree(list: Process[]): ProcessTreeNode[] {
  const byPid = new Map<number, ProcessTreeNode>()
  for (const p of list) byPid.set(p.pid, { ...p, children: [] })
  const roots: ProcessTreeNode[] = []
  for (const p of byPid.values()) {
    const parent = byPid.get(p.ppid)
    if (parent && parent.pid !== p.pid) parent.children.push(p)
    else roots.push(p)
  }
  return roots
}

/** Collect the subtree rooted at `pid`. */
export function subtree(
  list: Process[],
  pid: number,
): ProcessTreeNode | undefined {
  const tree = buildTree(list)
  return findInTree(tree, pid)
}

function findInTree(
  nodes: ProcessTreeNode[],
  pid: number,
): ProcessTreeNode | undefined {
  for (const n of nodes) {
    if (n.pid === pid) return n
    const hit = findInTree(n.children, pid)
    if (hit) return hit
  }
  return undefined
}

/** Direct children of a pid. */
export function childrenOf(list: Process[], pid: number): Process[] {
  return list.filter(p => p.ppid === pid)
}

// ---- lsof: files per pid ------------------------------------------

export async function listFilesFor(pid: number): Promise<string[]> {
  const { stdout } = await exec(['lsof', '-p', String(pid), '-Fn'])
  return stdout
    .split('\n')
    .filter(l => l.startsWith('n'))
    .map(l => l.slice(1))
}

export async function listPortsFor(pid: number): Promise<PortRow[]> {
  const all = await listPorts()
  return all.filter(p => p.pid === pid)
}

// ---- kill ----------------------------------------------------------

/**
 * Kill a process by pid. Uses Node's `process.kill` so we don't
 * shell out — that matches every other signal-sending tool and
 * bubbles up a cleaner error message when the pid is gone.
 */
export function killPid(pid: number, signal: NodeJS.Signals = 'SIGTERM'): void {
  try {
    globalThis.process.kill(pid, signal)
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code
    if (code === 'ESRCH') {
      throw new Error(`no such process: ${pid}`)
    }
    if (code === 'EPERM') {
      throw new Error(`permission denied killing pid ${pid}`)
    }
    throw error
  }
}

export async function killByText(
  text: string,
  signal: NodeJS.Signals = 'SIGTERM',
): Promise<number[]> {
  const all = await listProcesses()
  const matches = await filterByText(all, text)
  const killed: number[] = []
  for (const p of matches) {
    try {
      killPid(p.pid, signal)
      killed.push(p.pid)
    } catch {
      // Skip failures — partial kill is the expected behaviour
      // across mixed-permission processes.
    }
  }
  return killed
}

export async function killByPort(
  port: number,
  signal: NodeJS.Signals = 'SIGTERM',
): Promise<number[]> {
  const ports = await listPorts()
  const hits = ports.filter(p => p.port === port)
  const killed: number[] = []
  for (const h of hits) {
    try {
      killPid(h.pid, signal)
      killed.push(h.pid)
    } catch {}
  }
  return killed
}
