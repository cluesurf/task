/**
 * `task edit ssh` — hand the TTY to an interactive editor so the
 * user can tweak `~/.ssh/config` directly. Picks the editor from
 * `$VISUAL` → `$EDITOR` → `vi`, which is every unix convention
 * rolled into one.
 */

import child_process from 'node:child_process'
import fs from 'node:fs/promises'
import { DEFAULT_CONFIG_PATH } from '~/code/tool/node/ssh/base'

export async function editSshNode() {
  // `fs.open` with 'a' creates the file if it doesn't exist so the
  // editor doesn't open on a non-existent path and complain.
  const handle = await fs.open(DEFAULT_CONFIG_PATH, 'a')
  await handle.close()

  const editor = process.env.VISUAL || process.env.EDITOR || 'vi'
  await new Promise<void>((resolve, reject) => {
    const child = child_process.spawn(editor, [DEFAULT_CONFIG_PATH], {
      stdio: 'inherit',
    })
    child.on('exit', code => {
      if (code === 0 || code === null) resolve()
      else reject(new Error(`${editor} exited with code ${code}`))
    })
    child.on('error', reject)
  })
}
