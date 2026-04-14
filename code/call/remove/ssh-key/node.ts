import { removeKey } from '~/code/tool/node/ssh/key'

export type RemoveSshKeyNodeInput = { name: string }

export async function removeSshKeyNode(input: RemoveSshKeyNodeInput) {
  await removeKey(input.name)
  return { name: input.name, removed: true }
}
