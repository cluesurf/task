import { readOne, updateConfig, type SshEntry } from '~/code/tool/node/ssh/base'

export type AddSshNodeInput = {
  name: string
  host: string
  user?: string
  port?: number
  key?: string
  jump?: string
  forward?: string[]
}

async function addSshNode(input: AddSshNodeInput) {
  const existing = await readOne(input.name)
  if (existing) {
    throw new Error(
      `add ssh: \`${input.name}\` already exists. Use \`task set ssh\` to patch it.`,
    )
  }
  const entry: Partial<SshEntry> = {
    host: input.host,
    user: input.user,
    port: input.port,
    key: input.key,
    jump: input.jump,
    forward: input.forward,
  }
  await updateConfig(input.name, entry)
  return { name: input.name }
}

export default addSshNode
export { addSshNode }
