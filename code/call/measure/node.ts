import tint, { Tint } from '@termsurf/tint-text'
import stripAnsi from 'strip-ansi'
import { measureUrl } from '~/code/tool/node/network/make'
import { getLoggingStyle } from '~/code/tool/node/log'

const KEY: Tint = { tone: 'white' }
const VAL: Tint = { tone: 'whiteBright' }
const HEAD: Tint = { tone: 'whiteBright', bold: true }

export type MeasureNodeInput = { url: string }

async function measureNode(input: MeasureNodeInput) {
  const r = await measureUrl(input.url)

  const style = getLoggingStyle()
  if (style === 'pretty' || style === 'text') {
    const color = style === 'pretty'
    const paint = (s: string, t: Tint) =>
      color ? tint(s, t) : stripAnsi(tint(s, t))
    const rows: Array<[string, string]> = [
      ['status', String(r.status)],
      ['dns', `${r.dnsMs} ms`],
      ['connect', `${r.connectMs} ms`],
      ['ttfb', `${r.ttfbMs} ms`],
      ['total', `${r.totalMs} ms`],
      ['size', `${r.sizeBytes ?? 0} bytes`],
    ]
    const widest = rows.reduce((m, [k]) => Math.max(m, k.length), 0)
    const out: string[] = ['', paint(r.url, HEAD), '']
    for (const [k, v] of rows) {
      out.push(paint(k.padEnd(widest), KEY) + '    ' + paint(v, VAL))
    }
    out.push('')
    process.stdout.write(out.join('\n') + '\n')
  }
  return r
}

export default measureNode
export { measureNode }
