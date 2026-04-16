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
  const { bin, args } = buildCommandToRotateVideo({
    inputPath,
    outputPath,
    degree: input.degree,
  })
  await spawnAndWait({ verb: 'rotate', bin, args })
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
