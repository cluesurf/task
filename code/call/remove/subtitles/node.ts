/**
 * `task remove subtitles` — drop every subtitle stream from a
 * video container via `ffmpeg -sn`. `-c copy` preserves the video
 * and audio bitstreams so there's no re-encode (fast + lossless).
 */

import { ensureParentDir } from '~/code/tool/node/file'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { siblingWithSuffix } from '~/code/tool/shared/verb'
import { buildCommandToRemoveSubtitles } from './command'
import {
  parseRemoveSubtitlesNode,
  testRemoveSubtitlesNode,
  type RemoveSubtitlesNodeInput,
  type RemoveSubtitlesNodeOutput,
} from './shared'

export type { RemoveSubtitlesNodeInput, RemoveSubtitlesNodeOutput }
export { testRemoveSubtitlesNode }

export async function removeSubtitlesNode(
  source: RemoveSubtitlesNodeInput,
): Promise<RemoveSubtitlesNodeOutput> {
  const src = parseRemoveSubtitlesNode(source)
  const out =
    src.output ??
    siblingWithSuffix({ path: src.input, suffix: '.nosub' })
  await ensureParentDir(out)
  const command = buildCommandToRemoveSubtitles(src, out)
  await spawnAndWait({
    verb: 'remove subtitles',
    bin: command.bin,
    args: command.args,
  })
  return { file: { path: out } }
}
