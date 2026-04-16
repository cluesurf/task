/**
 * `task edit ssh` — hand the TTY to an interactive editor so the
 * user can tweak `~/.ssh/config` directly. Picks the editor from
 * `$VISUAL` → `$EDITOR` → `vi`, which is every unix convention
 * rolled into one.
 */

import fs from 'node:fs/promises'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { DEFAULT_CONFIG_PATH } from '~/code/tool/node/ssh/base'

export async function editSshNode() {
  // `fs.open` with 'a' creates the file if it doesn't exist so the
  // editor doesn't open on a non-existent path and complain.
  const handle = await fs.open(DEFAULT_CONFIG_PATH, 'a')
  await handle.close()

  const editor = process.env.VISUAL || process.env.EDITOR || 'vi'
  await spawnAndWait({
    verb: 'edit ssh',
    bin: editor,
    args: [DEFAULT_CONFIG_PATH],
    // Interactive editor: accept both clean exit and Ctrl+C (null).
    okExitCodes: [0, null],
  })
}
