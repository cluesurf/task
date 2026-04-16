import { readOne, updateConfig } from '~/code/tool/node/ssh/make'

export type RemoveSshHostNodeInput = { name: string }

async function removeSshHostNode(
  input: RemoveSshHostNodeInput,
) {
  const existing = await readOne(input.name)
  if (!existing) {
    throw new Error(
      `remove ssh-host: no entry \`${input.name}\` in ~/.ssh/config`,
    )
  }
  await updateConfig(input.name, null)
  return { name: input.name, removed: true }
}

export default removeSshHostNode
export { removeSshHostNode }
