/**
 * `task update video --subtitles subs.srt` -- mux the sidecar
 * subtitle stream into the video. For MP4, ffmpeg picks
 * `mov_text` automatically via the container. For MKV, sub format
 * pass-through works out of the box.
 */

import type { UpdateVideoNodeLocalInput } from '~/code/form/action/update/video/node'
import {
  UpdateVideoNodeInputParser,
  UpdateVideoNodeLocalInputParser,
  UpdateVideoNodeOutputParser,
} from '~/code/form/action/update/video/node/take'
import { ensureParentDir } from '~/code/tool/node/file'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { runCommandSequence } from '~/code/tool/node/command'
import { buildUpdateVideoCommand } from './command'

async function runLocal(input: UpdateVideoNodeLocalInput) {
  if (!input.subtitles) {
    throw new Error('update video: pass --subtitles <path>')
  }

  const inputPath = input.input.file.path
  const outputPath = input.output.file.path
  if (outputPath === inputPath) {
    throw new Error(
      'update video: pass -o <out.mp4>. ffmpeg cannot remux in place',
    )
  }
  await ensureParentDir(outputPath)

  await runCommandSequence(
    buildUpdateVideoCommand({
      inputPath,
      outputPath,
      subtitles: input.subtitles,
    }),
  )
  return { file: { path: outputPath } }
}

const [updateVideoNode, testUpdateVideoNode] = createNodeHandler({
  parsers: {
    input: UpdateVideoNodeInputParser,
    local: UpdateVideoNodeLocalInputParser,
    output: UpdateVideoNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export { updateVideoNode, testUpdateVideoNode }
