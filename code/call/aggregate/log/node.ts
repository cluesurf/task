/**
 * `task aggregate log <file> --key <field>` — count how many
 * log entries match each distinct value of the named field.
 * Uses the same parser pipeline as `task parse log`, so JSON,
 * nginx, and syslog formats all work out of the box.
 */

import fs from 'node:fs/promises'
import tint, { Tint } from '@termsurf/tint-text'
import stripAnsi from 'strip-ansi'
import { parseLogLine, type LogEntry } from '~/code/tool/node/log-parse/base'
import { getLoggingStyle } from '~/code/tool/node/log'

const KEY: Tint = { tone: 'white' }
const CELL: Tint = { tone: 'whiteBright' }
const COUNT: Tint = { tone: 'cyan' }

export type AggregateLogNodeInput = {
  file: string
  key: string
  limit: number
}

export async function aggregateLogNode(input: AggregateLogNodeInput) {
  const text = await fs.readFile(input.file, 'utf8')
  const tally = new Map<string, number>()

  for (const line of text.split('\n')) {
    if (!line.trim()) continue
    const entry = parseLogLine(line)
    const value = extract(entry, input.key)
    if (value === undefined) continue
    const serialized = String(value)
    tally.set(serialized, (tally.get(serialized) ?? 0) + 1)
  }

  const sorted = [...tally.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, input.limit)

  const style = getLoggingStyle()
  if (style === 'pretty' || style === 'text') {
    const color = style === 'pretty'
    const paint = (s: string, t: Tint) =>
      color ? tint(s, t) : stripAnsi(tint(s, t))
    const widest = sorted.reduce((m, [k]) => Math.max(m, k.length), 0)
    const widestCount = sorted.reduce(
      (m, [, c]) => Math.max(m, String(c).length),
      0,
    )
    const out: string[] = ['']
    out.push(paint(input.key.padEnd(widest), KEY) + '    ' + paint('count'.padStart(widestCount), KEY))
    out.push('')
    for (const [key, count] of sorted) {
      out.push(
        paint(key.padEnd(widest), CELL) +
          '    ' +
          paint(String(count).padStart(widestCount), COUNT),
      )
    }
    out.push('')
    process.stdout.write(out.join('\n') + '\n')
  }

  return { key: input.key, groups: Object.fromEntries(sorted) }
}

/**
 * Pull a value off a parsed entry. The parser normalizes common
 * fields onto named slots (status, level, method, ...) so those
 * work directly; anything else falls through to `extra`.
 */
function extract(entry: LogEntry, key: string): unknown {
  const lower = key.toLowerCase()
  const canonical = entry as unknown as Record<string, unknown>
  if (canonical[lower] !== undefined) return canonical[lower]
  if (entry.extra && entry.extra[key] !== undefined) return entry.extra[key]
  return undefined
}
