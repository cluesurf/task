import { readOne, updateConfig } from '~/code/tool/node/ssh/base'

export type RemoveSshHostNodeInput = { name: string }

export async function removeSshHostNode(
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
