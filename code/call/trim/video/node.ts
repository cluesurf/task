import type { TrimVideoNodeLocalInput } from '~/code/form/action/trim/video/node'
import {
  TrimVideoNodeInputParser,
  TrimVideoNodeLocalInputParser,
  TrimVideoNodeOutputParser,
} from '~/code/form/action/trim/video/node/take'
import { ensureParentDir } from '~/code/tool/node/file'
import { createNodeHandler } from '~/code/tool/node/handler'
import { resolveExternalInput, resolveInternalInput } from '~/code/tool/node/resolve'
import { runCommandSequence } from '~/code/tool/node/command'
import { buildCommandToTrimVideo } from './command'

async function runLocal(input: TrimVideoNodeLocalInput) {
  const inputPath = input.input.file.path
  const outputPath = input.output.file.path
  await ensureParentDir(outputPath)
  const sequence = buildCommandToTrimVideo({
    inputPath,
    outputPath,
    start: input.start,
    end: input.end,
    duration: input.duration,
    reencode: input.reencode,
  })
  await runCommandSequence(sequence)
  return { file: { path: outputPath } }
}

const [trimVideoNode, testTrimVideoNode] = createNodeHandler({
  parsers: {
    input: TrimVideoNodeInputParser,
    local: TrimVideoNodeLocalInputParser,
    output: TrimVideoNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export { trimVideoNode, testTrimVideoNode }
