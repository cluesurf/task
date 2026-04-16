/**
 * `task copy ssh-key` — pipe the .pub into the platform
 * clipboard tool. Platform detection + spawning live in
 * `code/tool/node/clipboard.ts`.
 */

import { copyToClipboard } from '~/code/tool/node/clipboard'
import { readPublicKey } from '~/code/tool/node/ssh/key'

export type CopySshKeyNodeInput = { name: string }

async function copySshKeyNode(input: CopySshKeyNodeInput) {
  const key = await readPublicKey(input.name)
  await copyToClipboard({ verb: 'copy ssh-key', value: key + '\n' })
  return { name: input.name, bytes: key.length }
}

export default copySshKeyNode
export { copySshKeyNode }
