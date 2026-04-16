/**
 * `task highlight log <file>` — paint each log line by its level
 * so errors leap off the page. `--level <name>` filters to rows
 * at or above that severity; `--text <pat>` filters by substring.
 */

import fs from 'node:fs/promises'
import tint, { Tint } from '@termsurf/tint-text'
import stripAnsi from 'strip-ansi'
import { parseLogLine } from '~/code/tool/node/log-parse/base'
import { getLoggingStyle } from '~/code/tool/node/log'

const LEVEL_RANK: Record<string, number> = {
  trace: 0,
  debug: 1,
  info: 2,
  notice: 2,
  warn: 3,
  warning: 3,
  error: 4,
  err: 4,
  critical: 5,
  crit: 5,
  fatal: 5,
  alert: 6,
  emerg: 7,
  panic: 7,
}

const LEVEL_TINT: Record<string, Tint> = {
  trace: { tone: 'blackBright' },
  debug: { tone: 'blackBright' },
  info: { tone: 'blue' },
  notice: { tone: 'blue' },
  warn: { tone: 'yellow' },
  warning: { tone: 'yellow' },
  error: { tone: 'red' },
  err: { tone: 'red' },
  critical: { tone: 'red', bold: true },
  crit: { tone: 'red', bold: true },
  fatal: { tone: 'red', bold: true },
  alert: { tone: 'red', bold: true },
  emerg: { tone: 'red', bold: true },
  panic: { tone: 'red', bold: true },
}

const DEFAULT: Tint = { tone: 'white' }

export type HighlightLogNodeInput = {
  file: string
  level?: string
  text?: string
}

async function highlightLogNode(input: HighlightLogNodeInput) {
  const text = await fs.readFile(input.file, 'utf8')
  const minRank = input.level ? LEVEL_RANK[input.level.toLowerCase()] ?? 0 : 0
  const needle = input.text?.toLowerCase()

  const style = getLoggingStyle()
  const color = style === 'pretty'
  const paint = (s: string, t: Tint) =>
    color ? tint(s, t) : stripAnsi(tint(s, t))

  let shown = 0
  let total = 0
  for (const line of text.split('\n')) {
    if (!line) continue
    total++
    const entry = parseLogLine(line)
    const level = (entry.level ?? '').toLowerCase()
    const rank = LEVEL_RANK[level] ?? 2 // default to info when unknown
    if (input.level && rank < minRank) continue
    if (needle && !line.toLowerCase().includes(needle)) continue

    const tone = LEVEL_TINT[level] ?? DEFAULT
    if (style === 'pretty' || style === 'text') {
      process.stdout.write(paint(line, tone) + '\n')
    }
    shown++
  }

  return { shown, total }
}

export default highlightLogNode
export { highlightLogNode }
