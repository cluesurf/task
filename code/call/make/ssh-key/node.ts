import { generateKey } from '~/code/tool/node/ssh/key'
import { updateConfig } from '~/code/tool/node/ssh/base'

export type MakeSshKeyNodeInput = {
  name: string
  type: string
  bits?: number
  comment?: string
  emptyPass: boolean
  force: boolean
  host?: string
  user?: string
  port?: number
}

async function makeSshKeyNode(input: MakeSshKeyNodeInput) {
  const { priv, pub } = await generateKey({
    name: input.name,
    type: input.type,
    bits: input.bits,
    comment: input.comment,
    passphrase: input.emptyPass ? '' : undefined,
    force: input.force,
  })

  // `--host` is the auto-wire path — after generating the key we
  // also drop a matching `task add ssh` entry pointing at it so
  // `ssh <name>` Just Works after a single command.
  if (input.host) {
    await updateConfig(input.name, {
      host: input.host,
      user: input.user,
      port: input.port,
      key: priv,
    })
  }

  return { name: input.name, priv, pub, wired: !!input.host }
}

export default makeSshKeyNode
export { makeSshKeyNode }
