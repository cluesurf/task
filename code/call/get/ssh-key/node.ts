import { readPublicKey } from '~/code/tool/node/ssh/key'
import { getLoggingStyle } from '~/code/tool/node/log'

export type GetSshKeyNodeInput = { name: string }

async function getSshKeyNode(input: GetSshKeyNodeInput) {
  const key = await readPublicKey(input.name)
  const style = getLoggingStyle()
  if (style === 'pretty' || style === 'text') {
    process.stdout.write(key + '\n')
  }
  return { name: input.name, publicKey: key }
}

export default getSshKeyNode
export { getSshKeyNode }
