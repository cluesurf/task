import { readOne, updateConfig } from '~/code/tool/node/ssh/base'

export type SetSshNodeInput = {
  name: string
  host?: string
  user?: string
  port?: number
  key?: string
  jump?: string
  forward?: string[]
}

async function setSshNode(input: SetSshNodeInput) {
  const existing = await readOne(input.name)
  if (!existing) {
    throw new Error(
      `set ssh: \`${input.name}\` does not exist. Use \`task add ssh\` to create it.`,
    )
  }
  await updateConfig(input.name, {
    host: input.host,
    user: input.user,
    port: input.port,
    key: input.key,
    jump: input.jump,
    forward: input.forward,
  })
  return { name: input.name }
}

export default setSshNode
export { setSshNode }
