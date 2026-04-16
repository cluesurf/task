/**
 * `task remove subtitles` — drop every subtitle stream from a
 * video container via `ffmpeg -sn`. `-c copy` preserves the video
 * and audio bitstreams (fast + lossless).
 */

import type { RemoveSubtitlesNodeLocalInput } from '~/code/form/action/remove/subtitles/node'
import {
  RemoveSubtitlesNodeInputParser,
  RemoveSubtitlesNodeLocalInputParser,
  RemoveSubtitlesNodeOutputParser,
} from '~/code/form/action/remove/subtitles/node/take'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { siblingWithSuffix } from '~/code/tool/shared/verb'
import { buildCommandToRemoveSubtitles } from './command'

async function runLocal(input: RemoveSubtitlesNodeLocalInput) {
  const inputPath = input.input.file.path
  const outputPath =
    input.output?.file?.path ??
    siblingWithSuffix({ path: inputPath, suffix: '.nosub' })
  const command = buildCommandToRemoveSubtitles({
    inputPath,
    outputPath,
  })
  await spawnAndWait({
    verb: 'remove subtitles',
    bin: command.bin,
    args: command.args,
  })
  return { file: { path: outputPath } }
}

const [removeSubtitlesNode, testRemoveSubtitlesNode] =
  createNodeHandler({
    parsers: {
      input: RemoveSubtitlesNodeInputParser,
      local: RemoveSubtitlesNodeLocalInputParser,
      output: RemoveSubtitlesNodeOutputParser,
    },
    resolvers: {
      external: resolveExternalInput,
      internal: resolveInternalInput,
    },
    runLocal,
  })

export { removeSubtitlesNode, testRemoveSubtitlesNode }
