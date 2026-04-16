// Vector -> raster. rsvg-convert is the fast, scriptable SVG
// renderer from librsvg. Prefer over inkscape for batch jobs.

import type {
  ConvertImageWithRsvgNodeInput,
  ConvertImageWithRsvgNodeLocalInput,
} from '~/code/form/action/convert/image/rsvg/node'
import {
  ConvertImageWithRsvgNodeInputParser,
  ConvertImageWithRsvgNodeLocalInputParser,
  ConvertImageWithRsvgNodeOutputParser,
} from '~/code/form/action/convert/image/rsvg/node/take'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { buildCommandToConvertImageWithRsvg } from './command'

async function runLocal(input: ConvertImageWithRsvgNodeLocalInput) {
  const inputPath = input.input.file.path
  const outputPath = input.output.file.path
  const command = buildCommandToConvertImageWithRsvg({
    inputPath,
    outputPath,
    outputFormat: input.outputFormat,
    width: input.width,
    height: input.height,
    dpi: input.dpi,
    background: input.background,
  })
  await spawnAndWait({
    verb: 'convert image',
    bin: command.bin,
    args: command.args,
  })
  return { file: { path: outputPath } }
}

const [convertImageWithRsvgNode, testConvertImageWithRsvgNode] =
  createNodeHandler({
    parsers: {
      input: ConvertImageWithRsvgNodeInputParser,
      local: ConvertImageWithRsvgNodeLocalInputParser,
      output: ConvertImageWithRsvgNodeOutputParser,
    },
    resolvers: {
      external: resolveExternalInput,
      internal: resolveInternalInput,
    },
    runLocal,
  })

export default convertImageWithRsvgNode
export { convertImageWithRsvgNode, testConvertImageWithRsvgNode }
export type { ConvertImageWithRsvgNodeInput }
