import { exec } from '~/code/tool/node/process'
import { getLoggingStyle } from '~/code/tool/node/log'

export type ScanSshNodeInput = { host: string; type?: string }

export async function scanSshNode(input: ScanSshNodeInput) {
  const args = ['ssh-keyscan']
  if (input.type) args.push('-t', input.type)
  args.push(input.host)
  const { stdout } = await exec(args)

  const style = getLoggingStyle()
  if (style === 'pretty' || style === 'text') {
    process.stdout.write(stdout + '\n')
  }
  return { host: input.host, keys: stdout.trim().split('\n').filter(Boolean) }
}
