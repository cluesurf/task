import type { CompressAudioNodeLocalInput } from '~/code/form/action/compress/audio/node'
import {
  CompressAudioNodeInputParser,
  CompressAudioNodeLocalInputParser,
  CompressAudioNodeOutputParser,
} from '~/code/form/action/compress/audio/node/take'
import { ensureParentDir } from '~/code/tool/node/file'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { buildCommandToCompressAudio } from './command'

async function runLocal(input: CompressAudioNodeLocalInput) {
  const inputPath = input.input.file.path
  const outputPath = input.output.file.path
  await ensureParentDir(outputPath)
  const { bin, args } = buildCommandToCompressAudio({
    inputPath,
    outputPath,
    bitrate: input.bitrate,
  })
  await spawnAndWait({ verb: 'compress', bin, args })
  return { file: { path: outputPath } }
}

const [compressAudioNode, testCompressAudioNode] = createNodeHandler({
  parsers: {
    input: CompressAudioNodeInputParser,
    local: CompressAudioNodeLocalInputParser,
    output: CompressAudioNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export default compressAudioNode
export { compressAudioNode, testCompressAudioNode }
