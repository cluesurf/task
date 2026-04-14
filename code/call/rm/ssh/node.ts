import { readOne, updateConfig } from '~/code/tool/node/ssh/base'

export type RmSshNodeInput = { name: string }

export async function rmSshNode(input: RmSshNodeInput) {
  const existing = await readOne(input.name)
  if (!existing) {
    throw new Error(
      `rm ssh: no entry \`${input.name}\` in ~/.ssh/config`,
    )
  }
  await updateConfig(input.name, null)
  return { name: input.name, removed: true }
}
