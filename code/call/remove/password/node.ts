/**
 * `task remove password` — strip an owner / user password from a
 * PDF via `qpdf --decrypt`. Needs the current password if the PDF
 * has a user password; owner-only protection decrypts without one.
 */

import { ensureParentDir } from '~/code/tool/node/file'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { siblingWithSuffix } from '~/code/tool/shared/verb'
import { buildCommandToRemovePassword } from './command'
import {
  parseRemovePasswordNode,
  testRemovePasswordNode,
  type RemovePasswordNodeInput,
  type RemovePasswordNodeOutput,
} from './shared'

export type { RemovePasswordNodeInput, RemovePasswordNodeOutput }
export { testRemovePasswordNode }

export async function removePasswordNode(
  source: RemovePasswordNodeInput,
): Promise<RemovePasswordNodeOutput> {
  const src = parseRemovePasswordNode(source)
  const out =
    src.output ??
    siblingWithSuffix({ path: src.input, suffix: '.unlocked' })
  await ensureParentDir(out)

  const command = buildCommandToRemovePassword(src, out)
  await spawnAndWait({
    verb: 'remove password',
    bin: command.bin,
    args: command.args,
  })
  return { file: { path: out } }
}
