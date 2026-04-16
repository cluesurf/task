import type { RotateVideoNodeLocalInput } from '~/code/form/action/rotate/video/node'
import {
  RotateVideoNodeInputParser,
  RotateVideoNodeLocalInputParser,
  RotateVideoNodeOutputParser,
} from '~/code/form/action/rotate/video/node/take'
import { ensureParentDir } from '~/code/tool/node/file'
import { createNodeHandler } from '~/code/tool/node/handler'
import { resolveExternalInput, resolveInternalInput } from '~/code/tool/node/resolve'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { buildCommandToRotateVideo } from './command'

async function runLocal(input: RotateVideoNodeLocalInput) {
  const inputPath = input.input.file.path
  const outputPath = input.output.file.path
  await ensureParentDir(outputPath)
  const sequence = buildCommandToRotateVideo({
    inputPath,
    outputPath,
    degree: input.degree,
  })
  for (const cmd of sequence.call) {
    await spawnAndWait({ verb: 'rotate', bin: cmd.link[0]!, args: cmd.link.slice(1) })
  }
  return { file: { path: outputPath } }
}

const [rotateVideoNode, testRotateVideoNode] = createNodeHandler({
  parsers: {
    input: RotateVideoNodeInputParser,
    local: RotateVideoNodeLocalInputParser,
    output: RotateVideoNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export default rotateVideoNode
export { rotateVideoNode, testRotateVideoNode }
