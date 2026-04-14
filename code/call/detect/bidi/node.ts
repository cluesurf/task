import fs from 'node:fs/promises'
import tint, { Tint } from '@termsurf/tint-text'
import stripAnsi from 'strip-ansi'
import { detectBidi } from '~/code/tool/node/unicode/base'
import { getLoggingStyle } from '~/code/tool/node/log'

const WARN: Tint = { tone: 'red', bold: true }
const CELL: Tint = { tone: 'whiteBright' }
const DIM: Tint = { tone: 'white' }

export type DetectBidiNodeInput = { file: string }

export async function detectBidiNode(input: DetectBidiNodeInput) {
  const text = await fs.readFile(input.file, 'utf8')
  const hits = detectBidi(text)

  const style = getLoggingStyle()
  if (style === 'pretty' || style === 'text') {
    const color = style === 'pretty'
    const paint = (s: string, t: Tint) =>
      color ? tint(s, t) : stripAnsi(tint(s, t))
    if (hits.length === 0) {
      process.stdout.write(paint('\nno bidi markers found\n\n', DIM))
    } else {
      const out: string[] = ['', paint(`${hits.length} bidi marker(s) found`, WARN), '']
      for (const h of hits) {
        out.push(
          paint(h.codepoint, CELL) +
            '  at offset ' +
            paint(String(h.index), CELL) +
            '  ' +
            paint(`"${h.context}"`, DIM),
        )
      }
      out.push('')
      process.stdout.write(out.join('\n') + '\n')
    }
  }
  return { hits, clean: hits.length === 0 }
}
