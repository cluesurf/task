/**
 * `task open ssh <name>` — hand control of the TTY to ssh. Does
 * NOT go through `runAction` / `exec` — those capture stdout,
 * which would break the interactive shell. We spawn ssh with
 * `stdio: 'inherit'` and wait for it to exit.
 */

import { spawnAndWait } from '~/code/tool/node/spawn'
import { readOne } from '~/code/tool/node/ssh/base'

export type OpenSshNodeInput = { name: string }

async function openSshNode(input: OpenSshNodeInput) {
  const entry = await readOne(input.name)
  if (!entry) {
    throw new Error(
      `open ssh: no entry \`${input.name}\` in ~/.ssh/config`,
    )
  }

  await spawnAndWait({
    verb: 'open ssh',
    bin: 'ssh',
    args: [input.name],
    // Interactive session: accept clean exit and Ctrl+C.
    okExitCodes: [0, null],
  })
}

export default openSshNode
export { openSshNode }
