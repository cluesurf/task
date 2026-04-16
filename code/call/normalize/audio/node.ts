/**
 * `task normalize audio` -- run the file through ffmpeg's
 * `loudnorm` filter targeting EBU R128 defaults (-16 LUFS / -1
 * dB TP / 11 LU range).
 */

import type { NormalizeAudioNodeLocalInput } from '~/code/form/action/normalize/audio/node'
import {
  NormalizeAudioNodeInputParser,
  NormalizeAudioNodeLocalInputParser,
  NormalizeAudioNodeOutputParser,
} from '~/code/form/action/normalize/audio/node/take'
import { ensureParentDir } from '~/code/tool/node/file'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { buildNormalizeAudioCommand } from './command'

async function runLocal(input: NormalizeAudioNodeLocalInput) {
  const outputPath = input.output.file.path
  await ensureParentDir(outputPath)

  const { bin, args } = buildNormalizeAudioCommand({
    inputPath: input.input.file.path,
    outputPath,
    target: input.target,
    peak: input.peak,
    range: input.range,
  })
  await spawnAndWait({ verb: 'normalize', bin, args })
  return { file: { path: outputPath } }
}

const [normalizeAudioNode, testNormalizeAudioNode] = createNodeHandler({
  parsers: {
    input: NormalizeAudioNodeInputParser,
    local: NormalizeAudioNodeLocalInputParser,
    output: NormalizeAudioNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export default normalizeAudioNode
export { normalizeAudioNode, testNormalizeAudioNode }
