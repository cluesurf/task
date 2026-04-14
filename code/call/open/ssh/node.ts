/**
 * `task open ssh <name>` — hand control of the TTY to ssh. Does
 * NOT go through `runAction` / `exec` — those capture stdout,
 * which would break the interactive shell. We spawn ssh with
 * `stdio: 'inherit'` and wait for it to exit.
 */

import child_process from 'node:child_process'
import { readOne } from '~/code/tool/node/ssh/base'

export type OpenSshNodeInput = { name: string }

export async function openSshNode(input: OpenSshNodeInput) {
  const entry = await readOne(input.name)
  if (!entry) {
    throw new Error(`open ssh: no entry \`${input.name}\` in ~/.ssh/config`)
  }

  await new Promise<void>((resolve, reject) => {
    const child = child_process.spawn('ssh', [input.name], {
      stdio: 'inherit',
    })
    child.on('exit', code => {
      if (code === 0 || code === null) resolve()
      else reject(new Error(`ssh exited with code ${code}`))
    })
    child.on('error', reject)
  })
}
