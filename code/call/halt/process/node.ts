import { killByText, killPid } from '~/code/tool/node/proc/make'
import { getLoggingStyle } from '~/code/tool/node/log'

export type HaltProcessNodeInput = {
  pid?: number
  text?: string
  signal: NodeJS.Signals
}

async function haltProcessNode(input: HaltProcessNodeInput) {
  const killed: number[] = []
  if (input.pid !== undefined) {
    killPid(input.pid, input.signal)
    killed.push(input.pid)
  } else if (input.text) {
    killed.push(...(await killByText(input.text, input.signal)))
  }

  const style = getLoggingStyle()
  if (style === 'pretty' || style === 'text') {
    process.stdout.write(
      killed.length === 0
        ? '\nno processes matched\n\n'
        : `\nhalted: ${killed.join(', ')}\n\n`,
    )
  }
  return { killed }
}

export default haltProcessNode
export { haltProcessNode }
