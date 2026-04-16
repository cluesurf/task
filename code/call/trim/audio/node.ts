import type { TrimAudioNodeLocalInput } from '~/code/form/action/trim/audio/node'
import {
  TrimAudioNodeInputParser,
  TrimAudioNodeLocalInputParser,
  TrimAudioNodeOutputParser,
} from '~/code/form/action/trim/audio/node/take'
import { ensureParentDir } from '~/code/tool/node/file'
import { createNodeHandler } from '~/code/tool/node/handler'
import { resolveExternalInput, resolveInternalInput } from '~/code/tool/node/resolve'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { buildCommandToTrimAudio } from './command'

async function runLocal(input: TrimAudioNodeLocalInput) {
  const inputPath = input.input.file.path
  const outputPath = input.output.file.path
  await ensureParentDir(outputPath)
  const command = buildCommandToTrimAudio({
    inputPath,
    outputPath,
    start: input.start,
    end: input.end,
    duration: input.duration,
  })
  await spawnAndWait({
    verb: 'trim audio',
    bin: command.bin,
    args: command.args,
  })
  return { file: { path: outputPath } }
}

const [trimAudioNode, testTrimAudioNode] = createNodeHandler({
  parsers: {
    input: TrimAudioNodeInputParser,
    local: TrimAudioNodeLocalInputParser,
    output: TrimAudioNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export default trimAudioNode
export { trimAudioNode, testTrimAudioNode }
