/**
 * `task remove audio` -- strip the audio track from a video
 * via `ffmpeg -an`. Four-branch node handler.
 */

import type { RemoveAudioNodeLocalInput } from '~/code/form/action/remove/audio/node'
import {
  RemoveAudioNodeInputParser,
  RemoveAudioNodeLocalInputParser,
  RemoveAudioNodeOutputParser,
} from '~/code/form/action/remove/audio/node/take'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { ensureParentDir } from '~/code/tool/node/file'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { buildCommandToRemoveAudio } from './command'

async function runLocal(input: RemoveAudioNodeLocalInput) {
  const outputPath = input.output.file.path
  await ensureParentDir(outputPath)

  const command = buildCommandToRemoveAudio({
    inputPath: input.input.file.path,
    outputPath,
  })
  await spawnAndWait({
    verb: 'remove audio',
    bin: command.bin,
    args: command.args,
  })
  return { file: { path: outputPath } }
}

const [removeAudioNode, testRemoveAudioNode] = createNodeHandler({
  parsers: {
    input: RemoveAudioNodeInputParser,
    local: RemoveAudioNodeLocalInputParser,
    output: RemoveAudioNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export default removeAudioNode
export { removeAudioNode, testRemoveAudioNode }
