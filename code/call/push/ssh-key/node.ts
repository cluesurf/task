import { pushKey } from '~/code/tool/node/ssh/key'

export type PushSshKeyNodeInput = { name: string; host: string }

async function pushSshKeyNode(input: PushSshKeyNodeInput) {
  await pushKey(input.name, input.host)
  return { name: input.name, host: input.host }
}

export default pushSshKeyNode
export { pushSshKeyNode }
