import type { RotateImageNodeLocalInput } from '~/code/form/action/rotate/image/node'
import {
  RotateImageNodeInputParser,
  RotateImageNodeLocalInputParser,
  RotateImageNodeOutputParser,
} from '~/code/form/action/rotate/image/node/take'
import { ensureParentDir } from '~/code/tool/node/file'
import { createNodeHandler } from '~/code/tool/node/handler'
import { resolveExternalInput, resolveInternalInput } from '~/code/tool/node/resolve'
import { runCommandSequence } from '~/code/tool/node/command'
import { buildCommandToRotateImage } from './command'

async function runLocal(input: RotateImageNodeLocalInput) {
  const inputPath = input.input.file.path
  const outputPath = input.output.file.path
  await ensureParentDir(outputPath)
  const sequence = buildCommandToRotateImage({
    inputPath,
    outputPath,
    degree: input.degree,
  })
  await runCommandSequence(sequence)
  return { file: { path: outputPath } }
}

const [rotateImageNode, testRotateImageNode] = createNodeHandler({
  parsers: {
    input: RotateImageNodeInputParser,
    local: RotateImageNodeLocalInputParser,
    output: RotateImageNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export default rotateImageNode
export { rotateImageNode, testRotateImageNode }
