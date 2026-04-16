/**
 * `task compare` — side-by-side visual diff in the terminal.
 * Pipeline:
 *
 *   1. Parse both files into an in-memory value (JSON / YAML /
 *      TOML; `--as text` skips the parse).
 *   2. Use jsondiffpatch to decide equality (empty delta = no
 *      output). Serialization still needs to happen on both
 *      sides for rendering, since the view is textual.
 *   3. Serialize both with stable key order + 2-space indent so
 *      line-level alignment actually lines up.
 *   4. Compute an LCS line-diff between the two canonical
 *      strings.
 *   5. Render two columns. Unchanged lines appear in both.
 *      Removed lines take the left column with a red
 *      background; added lines take the right column with a
 *      green background. No line numbers, no `+` / `-` marks —
 *      the background does the talking.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import tint, { Tint } from '@termsurf/tint-text'
import stripAnsi from 'strip-ansi'
import * as jsondiffpatch from 'jsondiffpatch'
import { getLoggingStyle } from '~/code/tool/node/log'

export type CompareNodeInput = {
  left: string
  right: string
  as?: string
}

const DIM: Tint = { tone: 'white' }
const HEAD: Tint = { tone: 'whiteBright', bold: true }

// 256-color ANSI codes for the diff backgrounds. The basic `red`
// / `green` backgrounds in tint-text are the saturated ANSI 1 / 2
// which read as neon on most dark themes. These muted variants
// (dark maroon + forest green) sit quieter under the text,
// matching GitHub's diff shading.
const DEL_BG = '\x1b[48;5;52m' // dark red
const ADD_BG = '\x1b[48;5;22m' // dark green
const FG_BRIGHT = '\x1b[97m'    // white-bright text on top
const RESET = '\x1b[0m'

async function compareNode(input: CompareNodeInput) {
  const format = (input.as ?? inferFormat(input.left, input.right) ?? 'json').toLowerCase()

  if (format === 'text') {
    const [leftText, rightText] = await Promise.all([
      fs.readFile(input.left, 'utf8'),
      fs.readFile(input.right, 'utf8'),
    ])
    renderSideBySide({
      leftLines: leftText.split('\n'),
      rightLines: rightText.split('\n'),
      leftLabel: input.left,
      rightLabel: input.right,
    })
    return { equal: leftText === rightText }
  }

  const leftValue = await loadStructured(input.left, format)
  const rightValue = await loadStructured(input.right, format)

  const delta = jsondiffpatch.diff(leftValue, rightValue)
  const equal = delta === undefined

  const leftCanonical = canonical(leftValue)
  const rightCanonical = canonical(rightValue)

  renderSideBySide({
    leftLines: leftCanonical.split('\n'),
    rightLines: rightCanonical.split('\n'),
    leftLabel: input.left,
    rightLabel: input.right,
  })

  return { equal, delta }
}

// ---- format detection + loaders ----------------------------------

function inferFormat(a: string, b: string): string | undefined {
  const pick = (e: string): string | undefined => {
    if (e === 'json' || e === 'jsonl' || e === 'ndjson') return 'json'
    if (e === 'yaml' || e === 'yml') return 'yaml'
    if (e === 'toml') return 'toml'
    return undefined
  }
  return (
    pick(path.extname(a).toLowerCase().slice(1)) ??
    pick(path.extname(b).toLowerCase().slice(1))
  )
}

async function loadStructured(file: string, format: string): Promise<unknown> {
  const text = await fs.readFile(file, 'utf8')
  if (format === 'json') return JSON.parse(text)
  if (format === 'yaml') {
    const yaml = await import('yaml').catch(() => null)
    if (!yaml) {
      throw new Error('compare: yaml parser not available — run `pnpm add yaml`')
    }
    return (yaml.default ?? yaml).parse(text)
  }
  if (format === 'toml') {
    const toml = await import('@iarna/toml' as string).catch(() => null) as
      | { parse: (s: string) => unknown; default?: { parse: (s: string) => unknown } }
      | null
    if (!toml) {
      throw new Error(
        'compare: toml parser not available — run `pnpm add @iarna/toml`',
      )
    }
    return (toml.default ?? toml).parse(text)
  }
  throw new Error(`compare: unsupported format "${format}"`)
}

/**
 * JSON serialization with sorted keys so diffs are stable across
 * reorderings — without this, adding a key at the top of `a` but
 * at the bottom of `b` shows up as every intervening line being
 * "changed".
 */
function canonical(value: unknown): string {
  return JSON.stringify(sortKeys(value), null, 2)
}

function sortKeys(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(sortKeys)
  if (v && typeof v === 'object') {
    const sorted: Record<string, unknown> = {}
    for (const key of Object.keys(v as Record<string, unknown>).sort()) {
      sorted[key] = sortKeys((v as Record<string, unknown>)[key])
    }
    return sorted
  }
  return v
}

// ---- LCS line alignment ------------------------------------------

type Row =
  | { kind: 'equal'; left: string; right: string }
  | { kind: 'remove'; left: string }
  | { kind: 'add'; right: string }

function diffLines(a: string[], b: string[]): Row[] {
  // Standard LCS table — O(n*m) time and space. Files we're
  // diffing here are human-readable configs so the scale stays
  // well within this bound.
  const n = a.length
  const m = b.length
  const table: number[][] = Array.from({ length: n + 1 }, () =>
    new Array(m + 1).fill(0),
  )
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      if (a[i] === b[j]) table[i]![j] = table[i + 1]![j + 1]! + 1
      else table[i]![j] = Math.max(table[i + 1]![j]!, table[i]![j + 1]!)
    }
  }
  const rows: Row[] = []
  let i = 0
  let j = 0
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      rows.push({ kind: 'equal', left: a[i]!, right: b[j]! })
      i++
      j++
    } else if (table[i + 1]![j]! >= table[i]![j + 1]!) {
      rows.push({ kind: 'remove', left: a[i]! })
      i++
    } else {
      rows.push({ kind: 'add', right: b[j]! })
      j++
    }
  }
  while (i < n) rows.push({ kind: 'remove', left: a[i++]! })
  while (j < m) rows.push({ kind: 'add', right: b[j++]! })
  return rows
}

// ---- render -------------------------------------------------------

function renderSideBySide(input: {
  leftLines: string[]
  rightLines: string[]
  leftLabel: string
  rightLabel: string
}): void {
  const style = getLoggingStyle()
  if (style !== 'pretty' && style !== 'text') return
  const color = style === 'pretty'
  const paint = (s: string, t: Tint) =>
    color ? tint(s, t) : stripAnsi(tint(s, t))

  // Split the terminal roughly in half. Leave one column for a
  // separator gap so long lines on both sides don't kiss.
  const termWidth =
    process.stdout.columns && process.stdout.columns > 40
      ? process.stdout.columns
      : 120
  const colWidth = Math.max(30, Math.floor((termWidth - 3) / 2))

  const rows = diffLines(input.leftLines, input.rightLines)
  const out: string[] = ['']
  const header =
    paint(path.basename(input.leftLabel).padEnd(colWidth), HEAD) +
    '  ' +
    paint(path.basename(input.rightLabel).padEnd(colWidth), HEAD)
  out.push(header, '')

  // Helpers that wrap a padded cell in the appropriate ANSI
  // background escape. Using raw codes (not tint-text) so we can
  // reach the 256-color palette for a subtle dark red / green
  // instead of the saturated basic ANSI pair.
  const cellAdd = (s: string) =>
    color ? `${ADD_BG}${FG_BRIGHT}${s}${RESET}` : s
  const cellDel = (s: string) =>
    color ? `${DEL_BG}${FG_BRIGHT}${s}${RESET}` : s
  const cellPlain = (s: string) => paint(s, DIM)

  for (const row of rows) {
    if (row.kind === 'equal') {
      out.push(
        cellPlain(truncate(row.left, colWidth).padEnd(colWidth)) +
          '  ' +
          cellPlain(truncate(row.right, colWidth).padEnd(colWidth)),
      )
    } else if (row.kind === 'remove') {
      out.push(
        cellDel(truncate(row.left, colWidth).padEnd(colWidth)) +
          '  ' +
          cellPlain(''.padEnd(colWidth)),
      )
    } else {
      out.push(
        cellPlain(''.padEnd(colWidth)) +
          '  ' +
          cellAdd(truncate(row.right, colWidth).padEnd(colWidth)),
      )
    }
  }
  out.push('')
  process.stdout.write(out.join('\n') + '\n')
}

function truncate(s: string, width: number): string {
  if (s.length <= width) return s
  return s.slice(0, Math.max(0, width - 1)) + '…'
}

export default compareNode
export { compareNode }
