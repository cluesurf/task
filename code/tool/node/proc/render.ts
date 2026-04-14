/**
 * Pretty-printers for `task list process`, `task list port`, and
 * the tree / group shapes. Basic ANSI only — matches the inspect
 * table style (dim key column, bright values).
 */

import tint, { Tint } from '@termsurf/tint-text'
import stripAnsi from 'strip-ansi'
import type { PortRow, Process, ProcessTreeNode } from './base'

const HEAD: Tint = { tone: 'white' }
const CELL: Tint = { tone: 'whiteBright' }
const DIM: Tint = { tone: 'white' }
/** Tree branch connectors — rendered darker than cell text so the
 * scaffolding recedes and the process names lead the eye. */
const BRANCH: Tint = { tone: 'blackBright' }
/** Per-stat tints for `--layout tree --show memory,cpu` so each
 * column gets its own cue without needing a header row. */
// `magenta` in most modern terminals IS purple; the bright
// variant can skew pink, so we stick with the base for the calmer
// shade.
const MEMORY: Tint = { tone: 'magenta' }
const CPU: Tint = { tone: 'blue' }

function paint(s: string, tone: Tint, color: boolean): string {
  return color ? tint(s, tone) : stripAnsi(tint(s, tone))
}

function pad(s: string, width: number): string {
  const visible = stripAnsi(s)
  if (visible.length >= width) return s + ' '
  return s + ' '.repeat(width - visible.length)
}

function humanBytesKB(kb: number): string {
  if (kb < 1024) return `${kb.toFixed(0)} KB`
  const mb = kb / 1024
  if (mb < 1024) return `${mb.toFixed(1)} MB`
  return `${(mb / 1024).toFixed(2)} GB`
}

export type ProcessColumn =
  | 'pid' | 'ppid' | 'user' | 'cpu' | 'memory' | 'rss' | 'name' | 'command'

/** Column picker / default set for `task list process`. `pid` is
 * always first and can't be dropped — tests and downstream tools
 * rely on the pid anchor. */
export const DEFAULT_PROCESS_COLUMNS: ProcessColumn[] = [
  'pid', 'user', 'cpu', 'memory', 'name',
]

const PROCESS_COLUMN_LABEL: Record<ProcessColumn, string> = {
  pid: 'PID',
  ppid: 'PPID',
  user: 'USER',
  cpu: 'CPU%',
  memory: 'MEM%',
  rss: 'RSS',
  name: 'NAME',
  command: 'COMMAND',
}

export function renderProcesses(
  list: Process[],
  color: boolean,
  columns: ProcessColumn[] = DEFAULT_PROCESS_COLUMNS,
): string {
  // Normalize: `pid` is always first, everything else follows in
  // the order the user asked for.
  const seen = new Set<ProcessColumn>(['pid'])
  const ordered: ProcessColumn[] = ['pid']
  for (const c of columns) {
    if (c === 'pid' || seen.has(c)) continue
    seen.add(c)
    ordered.push(c)
  }

  // Truncate COMMAND so a runaway Electron argv doesn't steamroll
  // the terminal. Full string stays in JSON output untouched.
  const termWidth =
    process.stdout.columns && process.stdout.columns > 40
      ? process.stdout.columns
      : 120
  const commandWidth = Math.max(20, termWidth - 80)

  const headers = ordered.map(c => PROCESS_COLUMN_LABEL[c])
  const rows = list.map(p => ordered.map(c => cellFor(p, c, commandWidth)))
  return renderTable(headers, rows, color)
}

function cellFor(
  p: Process,
  column: ProcessColumn,
  commandWidth: number,
): string {
  switch (column) {
    case 'pid':     return String(p.pid)
    case 'ppid':    return String(p.ppid)
    case 'user':    return p.user
    case 'cpu':     return p.cpu.toFixed(1)
    case 'memory':  return p.memory.toFixed(1)
    case 'rss':     return humanBytesKB(p.rss)
    case 'name':    return p.name
    case 'command': return truncate(p.command, commandWidth)
  }
}

function truncate(s: string, width: number): string {
  if (s.length <= width) return s
  return s.slice(0, Math.max(0, width - 1)) + '…'
}

export function isProcessColumn(value: string): value is ProcessColumn {
  return (
    value === 'pid' ||
    value === 'ppid' ||
    value === 'user' ||
    value === 'cpu' ||
    value === 'memory' ||
    value === 'rss' ||
    value === 'name' ||
    value === 'command'
  )
}

export function renderPorts(list: PortRow[], color: boolean): string {
  const headers = ['PORT', 'PROTO', 'STATUS', 'PID', 'USER', 'COMMAND']
  const rows = list.map(p => [
    String(p.port),
    p.protocol,
    p.status || '-',
    String(p.pid),
    p.user,
    p.command,
  ])
  return renderTable(headers, rows, color)
}

export function renderGroups(
  groups: Array<{
    key: string
    count: number
    cpu: number
    memory: number
    rss: number
  }>,
  color: boolean,
): string {
  const headers = ['GROUP', 'COUNT', 'CPU%', 'MEM%', 'RSS']
  const rows = groups.map(g => [
    g.key,
    String(g.count),
    g.cpu.toFixed(1),
    g.memory.toFixed(1),
    humanBytesKB(g.rss),
  ])
  return renderTable(headers, rows, color)
}

/** Column set rendered on each tree row. Default stays short —
 * `pid  name` — so nesting reads clearly. Use `--show memory,cpu`
 * to append stats (rendered in dim gray *after* the name). In
 * tree mode, `memory` / `rss` mean the whole-subtree total (own +
 * every descendant), matching Activity Monitor's roll-up.
 */
export const DEFAULT_TREE_COLUMNS: ProcessColumn[] = ['pid', 'name']

/**
 * Walk the tree and attach a `subtreeRss` to each node — its own
 * rss plus every descendant's rss. Parent nodes get rendered with
 * this aggregate so the number you see next to `launchd` is the
 * total memory footprint under it, not just its own.
 */
function annotateSubtree(nodes: ProcessTreeNode[]): void {
  const visit = (node: ProcessTreeNode): number => {
    let total = node.rss
    for (const child of node.children) total += visit(child)
    // Store on the node via any-cast so the tree shape stays
    // backward-compatible for callers that don't care.
    ;(node as unknown as { subtreeRss: number }).subtreeRss = total
    return total
  }
  for (const root of nodes) visit(root)
}

export function renderTree(
  nodes: ProcessTreeNode[],
  color: boolean,
  columns: ProcessColumn[] = DEFAULT_TREE_COLUMNS,
): string {
  // Tree rows always read pid → name → stats. The user's `--show`
  // picks which stats appear; pid and name stay anchored.
  const statCols: ProcessColumn[] = []
  const seen = new Set<ProcessColumn>(['pid', 'name'])
  for (const c of columns) {
    if (seen.has(c)) continue
    seen.add(c)
    statCols.push(c)
  }
  const ordered: ProcessColumn[] = ['pid', 'name', ...statCols]

  annotateSubtree(nodes)

  const out: string[] = []
  for (const root of nodes) {
    out.push(...treeLines(root, '', true, true, color, ordered))
  }
  return out.join('\n')
}

function treeLines(
  node: ProcessTreeNode,
  prefix: string,
  isLast: boolean,
  isRoot: boolean,
  color: boolean,
  columns: ProcessColumn[],
): string[] {
  // 2-space indent per level. Tighter than the usual 4-space
  // `│   ` / `    ` so deeply-nested user-process trees (iTerm →
  // zsh → claude → node → …) stay in view without wrapping.
  const connector = isRoot ? '' : isLast ? '└─' : '├─'
  // pid stays DIM, name leads as CELL (bright), and each stat
  // column picks a deliberate tint so users can scan a column at
  // a glance (memory = magenta, cpu = blue, other stats = branch
  // gray).
  const parts: string[] = []
  for (const col of columns) {
    const tone: Tint =
      col === 'pid'    ? DIM
      : col === 'name' ? CELL
      : col === 'rss' || col === 'memory' ? MEMORY
      : col === 'cpu'  ? CPU
      : BRANCH
    // For the tree view, `rss` and `memory` both mean the
    // aggregated subtree total computed by `annotateSubtree` —
    // Activity Monitor-style roll-up next to each parent.
    if (col === 'rss' || col === 'memory') {
      const total =
        (node as unknown as { subtreeRss?: number }).subtreeRss ?? node.rss
      parts.push(paint(humanBytesKB(total), tone, color))
    } else {
      parts.push(paint(cellFor(node, col, 80), tone, color))
    }
  }
  const label = parts.join('  ')
  const line = paint(prefix + connector + ' ', BRANCH, color) + label
  const lines = [line]
  const nextPrefix = isRoot ? '' : prefix + (isLast ? '  ' : '│ ')
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i]!
    const last = i === node.children.length - 1
    lines.push(...treeLines(child, nextPrefix, last, false, color, columns))
  }
  return lines
}

// ---- shared table renderer ----------------------------------------

function renderTable(
  headers: string[],
  rows: string[][],
  color: boolean,
): string {
  const widths = headers.map((h, i) =>
    Math.max(
      h.length,
      ...rows.map(r => (r[i] ? stripAnsi(r[i]!).length : 0)),
    ),
  )
  const lines: string[] = []
  lines.push('')
  lines.push(
    headers
      .map((h, i) => paint(pad(h, widths[i]! + 2), HEAD, color))
      .join(''),
  )
  for (const row of rows) {
    lines.push(
      row
        .map((c, i) => paint(pad(c ?? '', widths[i]! + 2), CELL, color))
        .join(''),
    )
  }
  lines.push('')
  return lines.join('\n')
}
