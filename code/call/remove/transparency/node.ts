/**
 * `task remove transparency` — flatten alpha into a solid
 * background via ImageMagick `-background <color> -alpha remove`.
 * Default background is white, which matches how most legacy
 * viewers composite PNGs without alpha support.
 */

import { ensureParentDir } from '~/code/tool/node/file'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { siblingWithSuffix } from '~/code/tool/shared/verb'
import { buildCommandToRemoveTransparency } from './command'
import {
  parseRemoveTransparencyNode,
  testRemoveTransparencyNode,
  type RemoveTransparencyNodeInput,
  type RemoveTransparencyNodeOutput,
} from './shared'

export type {
  RemoveTransparencyNodeInput,
  RemoveTransparencyNodeOutput,
}
export { testRemoveTransparencyNode }

export async function removeTransparencyNode(
  source: RemoveTransparencyNodeInput,
): Promise<RemoveTransparencyNodeOutput> {
  const src = parseRemoveTransparencyNode(source)
  const out =
    src.output ??
    siblingWithSuffix({ path: src.input, suffix: '.flat' })
  await ensureParentDir(out)

  const command = buildCommandToRemoveTransparency(src, out)
  await spawnAndWait({
    verb: 'remove transparency',
    bin: command.bin,
    args: command.args,
  })
  return { file: { path: out } }
}
