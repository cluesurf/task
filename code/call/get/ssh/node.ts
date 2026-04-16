import tint, { Tint } from '@termsurf/tint-text'
import stripAnsi from 'strip-ansi'
import { readOne, type SshEntry } from '~/code/tool/node/ssh/base'
import { getLoggingStyle } from '~/code/tool/node/log'

export type GetSshNodeInput = { name: string }

const KEY: Tint = { tone: 'white' }
const VAL: Tint = { tone: 'whiteBright' }
const HEAD: Tint = { tone: 'whiteBright', bold: true }

async function getSshNode(input: GetSshNodeInput) {
  const entry = await readOne(input.name)
  if (!entry) {
    throw new Error(`get ssh: no entry \`${input.name}\` in ~/.ssh/config`)
  }
  render(entry)
  return entry
}

function render(entry: SshEntry): void {
  const style = getLoggingStyle()
  if (style !== 'pretty' && style !== 'text') return
  const color = style === 'pretty'
  const paint = (s: string, t: Tint) =>
    color ? tint(s, t) : stripAnsi(tint(s, t))

  const rows: Array<[string, string]> = []
  rows.push(['name', entry.name])
  if (entry.host) rows.push(['host', entry.host])
  if (entry.user) rows.push(['user', entry.user])
  if (entry.port !== undefined) rows.push(['port', String(entry.port)])
  if (entry.key) rows.push(['key', entry.key])
  if (entry.jump) rows.push(['jump', entry.jump])
  if (entry.forward?.length)
    rows.push(['forward', entry.forward.join(', ')])
  if (entry.extra?.length) {
    for (const e of entry.extra) rows.push([e.key.toLowerCase(), e.value])
  }

  const widest = rows.reduce((m, [k]) => Math.max(m, k.length), 0)
  const out: string[] = ['', paint(entry.name, HEAD), '']
  for (const [k, v] of rows) {
    out.push(paint(k.padEnd(widest), KEY) + '    ' + paint(v, VAL))
  }
  out.push('')
  process.stdout.write(out.join('\n') + '\n')
}

export default getSshNode
export { getSshNode }
