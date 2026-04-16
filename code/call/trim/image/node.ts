import type { TrimImageNodeLocalInput } from '~/code/form/action/trim/image/node'
import {
  TrimImageNodeInputParser,
  TrimImageNodeLocalInputParser,
  TrimImageNodeOutputParser,
} from '~/code/form/action/trim/image/node/take'
import { ensureParentDir } from '~/code/tool/node/file'
import { createNodeHandler } from '~/code/tool/node/handler'
import { resolveExternalInput, resolveInternalInput } from '~/code/tool/node/resolve'
import { runCommandSequence } from '~/code/tool/node/command'
import { buildCommandToTrimImage } from './command'

function parseCropGeometry(crop: string): string {
  const parts = crop.split(',').map(s => s.trim())
  if (parts.length !== 4 || parts.some(p => !/^\d+$/.test(p))) {
    throw new Error(
      `trim image: --crop must be "x,y,w,h" (got "${crop}")`,
    )
  }
  const [x, y, w, h] = parts
  return `${w}x${h}+${x}+${y}`
}

async function runLocal(input: TrimImageNodeLocalInput) {
  const inputPath = input.input.file.path
  const outputPath = input.output.file.path
  const geometry = parseCropGeometry(input.crop)
  await ensureParentDir(outputPath)
  const sequence = buildCommandToTrimImage({
    inputPath,
    outputPath,
    geometry,
  })
  await runCommandSequence(sequence)
  return { file: { path: outputPath } }
}

const [trimImageNode, testTrimImageNode] = createNodeHandler({
  parsers: {
    input: TrimImageNodeInputParser,
    local: TrimImageNodeLocalInputParser,
    output: TrimImageNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export { trimImageNode, testTrimImageNode }
