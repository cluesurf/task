import tint, { Tint } from '@termsurf/tint-text'
import stripAnsi from 'strip-ansi'
import { testConnection } from '~/code/tool/node/ssh/base'
import { getLoggingStyle } from '~/code/tool/node/log'

const OK: Tint = { tone: 'green' }
const FAIL: Tint = { tone: 'red' }
const DIM: Tint = { tone: 'white' }

export type TestSshNodeInput = { name: string }

export async function testSshNode(input: TestSshNodeInput) {
  const result = await testConnection(input.name)

  const style = getLoggingStyle()
  if (style === 'pretty' || style === 'text') {
    const color = style === 'pretty'
    const paint = (s: string, t: Tint) =>
      color ? tint(s, t) : stripAnsi(tint(s, t))
    const mark = result.ok ? paint('✓', OK) : paint('✖', FAIL)
    process.stdout.write(
      `\n${mark} ${result.name} — ${paint(result.message, DIM)}\n\n`,
    )
  }

  if (!result.ok) throw new Error(result.message)
  return result
}
