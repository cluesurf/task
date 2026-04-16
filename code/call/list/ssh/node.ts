import tint, { Tint } from '@termsurf/tint-text'
import stripAnsi from 'strip-ansi'
import { readAll } from '~/code/tool/node/ssh/base'
import { getLoggingStyle } from '~/code/tool/node/log'

const HEAD: Tint = { tone: 'white' }
const CELL: Tint = { tone: 'whiteBright' }

async function listSshNode() {
  const entries = await readAll()

  const style = getLoggingStyle()
  if (style === 'pretty' || style === 'text') {
    const color = style === 'pretty'
    const paint = (s: string, t: Tint) =>
      color ? tint(s, t) : stripAnsi(tint(s, t))
    const rows = entries.map(e => [
      e.name,
      e.host ?? '',
      e.user ?? '',
      e.port !== undefined ? String(e.port) : '',
      e.key ?? '',
      e.jump ?? '',
    ])
    const headers = ['NAME', 'HOST', 'USER', 'PORT', 'KEY', 'JUMP']
    const widths = headers.map((h, i) =>
      Math.max(h.length, ...rows.map(r => (r[i] ?? '').length)),
    )
    const pad = (s: string, w: number) =>
      s.length >= w ? s + ' ' : s + ' '.repeat(w - s.length)
    const line = (vals: string[], tone: Tint) =>
      vals.map((v, i) => paint(pad(v, widths[i]! + 2), tone)).join('')

    const out: string[] = ['', line(headers, HEAD)]
    for (const row of rows) out.push(line(row, CELL))
    out.push('')
    process.stdout.write(out.join('\n') + '\n')
  }

  return { entries }
}

export default listSshNode
export { listSshNode }
