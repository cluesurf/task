import fs from 'node:fs/promises'
import tint, { Tint } from '@termsurf/tint-text'
import stripAnsi from 'strip-ansi'
import { codepoints, describeCodepoint } from '~/code/tool/node/unicode/base'
import { getLoggingStyle } from '~/code/tool/node/log'

const HEAD: Tint = { tone: 'white' }
const CELL: Tint = { tone: 'whiteBright' }
const DIM: Tint = { tone: 'white' }

export type InspectUnicodeNodeInput = { file: string; limit: number }

async function inspectUnicodeNode(input: InspectUnicodeNodeInput) {
  const text = await fs.readFile(input.file, 'utf8')
  const chars = codepoints(text).slice(0, input.limit)
  const rows = chars.map(ch => ({
    char: visibleFor(ch),
    ...describeCodepoint(ch),
  }))

  const style = getLoggingStyle()
  if (style === 'pretty' || style === 'text') {
    const color = style === 'pretty'
    const paint = (s: string, t: Tint) =>
      color ? tint(s, t) : stripAnsi(tint(s, t))
    const headers = ['CHAR', 'CODEPOINT', 'CATEGORY']
    const widths = [
      Math.max(headers[0]!.length, ...rows.map(r => r.char.length)),
      Math.max(headers[1]!.length, ...rows.map(r => r.codepoint.length)),
      Math.max(headers[2]!.length, ...rows.map(r => r.category.length)),
    ]
    const pad = (s: string, w: number) =>
      s.length >= w ? s + ' ' : s + ' '.repeat(w - s.length)
    const out: string[] = ['']
    out.push(
      headers.map((h, i) => paint(pad(h, widths[i]! + 2), HEAD)).join(''),
    )
    for (const row of rows) {
      out.push(
        paint(pad(row.char, widths[0]! + 2), CELL) +
          paint(pad(row.codepoint, widths[1]! + 2), CELL) +
          paint(pad(row.category, widths[2]! + 2), DIM),
      )
    }
    out.push('')
    process.stdout.write(out.join('\n') + '\n')
  }
  return { entries: rows }
}

/** Human-visible rendering for one scalar — control chars become
 *  their escape, zero-widths show as `·` so the column doesn't
 *  collapse. */
function visibleFor(ch: string): string {
  const cp = ch.codePointAt(0)!
  if (cp === 0x0a) return '\\n'
  if (cp === 0x0d) return '\\r'
  if (cp === 0x09) return '\\t'
  if (cp < 0x20 || cp === 0x7f) return `\\x${cp.toString(16).padStart(2, '0')}`
  if (cp === 0x200b || cp === 0x200c || cp === 0x200d || cp === 0xfeff) return '·'
  return ch
}

export default inspectUnicodeNode
export { inspectUnicodeNode }
