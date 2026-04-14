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

export function renderProcesses(
  list: Process[],
  color: boolean,
): string {
  const headers = ['PID', 'USER', 'CPU%', 'MEM%', 'RSS', 'NAME', 'COMMAND']
  // Truncate COMMAND so a runaway Electron argv doesn't steamroll
  // the terminal. Full string stays in JSON output untouched.
  const termWidth =
    process.stdout.columns && process.stdout.columns > 40
      ? process.stdout.columns
      : 120
  const commandWidth = Math.max(20, termWidth - 80)
  const rows = list.map(p => [
    String(p.pid),
    p.user,
    p.cpu.toFixed(1),
    p.memory.toFixed(1),
    humanBytesKB(p.rss),
    p.name,
    truncate(p.command, commandWidth),
  ])
  return renderTable(headers, rows, color)
}

function truncate(s: string, width: number): string {
  if (s.length <= width) return s
  return s.slice(0, Math.max(0, width - 1)) + '…'
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

export function renderTree(
  nodes: ProcessTreeNode[],
  color: boolean,
): string {
  const out: string[] = []
  for (const root of nodes) {
    out.push(...treeLines(root, '', true, color))
  }
  return out.join('\n')
}

function treeLines(
  node: ProcessTreeNode,
  prefix: string,
  isLast: boolean,
  color: boolean,
): string[] {
  const connector = prefix === '' ? '' : isLast ? '└── ' : '├── '
  const label =
    paint(String(node.pid), DIM, color) +
    '  ' +
    paint(node.name, CELL, color) +
    paint(`  ${node.command}`, DIM, color)
  const out = [paint(prefix + connector, DIM, color) + label]
  const nextPrefix = prefix + (prefix === '' ? '' : isLast ? '    ' : '│   ')
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i]!
    const last = i === node.children.length - 1
    out.push(...treeLines(child, nextPrefix, last, color))
  }
  return out
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
