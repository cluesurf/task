import tint, { Tint } from '@termsurf/tint-text'
import stripAnsi from 'strip-ansi'
import { pingHost } from '~/code/tool/node/network/base'
import { getLoggingStyle } from '~/code/tool/node/log'

const KEY: Tint = { tone: 'white' }
const VAL: Tint = { tone: 'whiteBright' }
const HEAD: Tint = { tone: 'whiteBright', bold: true }
const OK: Tint = { tone: 'green' }
const BAD: Tint = { tone: 'red' }

export type PingNodeInput = { host: string; count: number }

export async function pingNode(input: PingNodeInput) {
  const result = await pingHost(input.host, input.count)

  const style = getLoggingStyle()
  if (style === 'pretty' || style === 'text') {
    const color = style === 'pretty'
    const paint = (s: string, t: Tint) =>
      color ? tint(s, t) : stripAnsi(tint(s, t))
    const lines: string[] = ['', paint(input.host, HEAD), '']
    const rows: Array<[string, string]> = [
      ['sent', String(result.sent)],
      ['received', String(result.received)],
      ['loss', `${result.lossPercent}%`],
    ]
    if (result.avgMs !== undefined) {
      rows.push(['min / avg / max',
        `${result.minMs} / ${result.avgMs} / ${result.maxMs} ms`])
    }
    const widest = rows.reduce((m, [k]) => Math.max(m, k.length), 0)
    for (const [k, v] of rows) {
      lines.push(paint(k.padEnd(widest), KEY) + '    ' + paint(v, VAL))
    }
    const status = result.received === 0
      ? paint('unreachable', BAD)
      : paint('reachable', OK)
    lines.push('', status, '')
    process.stdout.write(lines.join('\n') + '\n')
  }

  return result
}
