/**
 * `task remove profile` — strip ICC color profile(s) from an image
 * via ImageMagick `mogrify +profile "*"`. Useful when a file has
 * an embedded profile that's confusing downstream renderers, or to
 * drop proprietary profiles before distribution.
 */

import { ensureParentDir } from '~/code/tool/node/file'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { siblingWithSuffix } from '~/code/tool/shared/verb'
import { buildCommandToRemoveProfile } from './command'
import {
  parseRemoveProfileNode,
  testRemoveProfileNode,
  type RemoveProfileNodeInput,
  type RemoveProfileNodeOutput,
} from './shared'

export type { RemoveProfileNodeInput, RemoveProfileNodeOutput }
export { testRemoveProfileNode }

export async function removeProfileNode(
  source: RemoveProfileNodeInput,
): Promise<RemoveProfileNodeOutput> {
  const src = parseRemoveProfileNode(source)
  const out =
    src.output ??
    siblingWithSuffix({ path: src.input, suffix: '.noicc' })
  await ensureParentDir(out)

  const command = buildCommandToRemoveProfile(src, out)
  await spawnAndWait({
    verb: 'remove profile',
    bin: command.bin,
    args: command.args,
  })
  return { file: { path: out } }
}
