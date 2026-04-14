import { killByPort } from '~/code/tool/node/proc/base'
import { getLoggingStyle } from '~/code/tool/node/log'

export type HaltPortNodeInput = {
  port: number
  signal: NodeJS.Signals
}

export async function haltPortNode(input: HaltPortNodeInput) {
  const killed = await killByPort(input.port, input.signal)

  const style = getLoggingStyle()
  if (style === 'pretty' || style === 'text') {
    process.stdout.write(
      killed.length === 0
        ? `\nno process was listening on port ${input.port}\n\n`
        : `\nhalted on port ${input.port}: ${killed.join(', ')}\n\n`,
    )
  }
  return { port: input.port, killed }
}
