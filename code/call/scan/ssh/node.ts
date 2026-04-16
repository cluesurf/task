import { spawnAndCapture } from '~/code/tool/node/spawn'
import { getLoggingStyle } from '~/code/tool/node/log'
import { buildCommandToScanSsh } from './command'

export type ScanSshNodeInput = { host: string; type?: string }

async function scanSshNode(input: ScanSshNodeInput) {
  const command = buildCommandToScanSsh({
    host: input.host,
    type: input.type,
  })
  const stdout = await spawnAndCapture({
    verb: 'scan ssh',
    bin: command.bin,
    args: command.args,
  })

  const style = getLoggingStyle()
  if (style === 'pretty' || style === 'text') {
    process.stdout.write(stdout + '\n')
  }
  return { host: input.host, keys: stdout.trim().split('\n').filter(Boolean) }
}

export default scanSshNode
export { scanSshNode }
