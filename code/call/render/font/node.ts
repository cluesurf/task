/**
 * `task render font` -- rasterize a text sample through a font
 * via HarfBuzz's `hb-view`. Output format is inferred from the
 * output extension (png, svg, pdf).
 */

import type { RenderFontNodeLocalInput } from '~/code/form/action/render/font/node'
import {
  RenderFontNodeInputParser,
  RenderFontNodeLocalInputParser,
  RenderFontNodeOutputParser,
} from '~/code/form/action/render/font/node/take'
import { ensureParentDir } from '~/code/tool/node/file'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { buildRenderFontCommand } from './command'

async function runLocal(input: RenderFontNodeLocalInput) {
  const outputPath = input.output.file.path
  await ensureParentDir(outputPath)

  const sequence = buildRenderFontCommand({
    input: input.input.file.path,
    output: outputPath,
    text: input.text,
    fontSize: input.fontSize,
    features: input.features,
  })
  for (const cmd of sequence.call) {
    await spawnAndWait({ verb: 'render', bin: cmd.link[0]!, args: cmd.link.slice(1) })
  }

  return { file: { path: outputPath } }
}

const [renderFontNode, testRenderFontNode] = createNodeHandler({
  parsers: {
    input: RenderFontNodeInputParser,
    local: RenderFontNodeLocalInputParser,
    output: RenderFontNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export default renderFontNode
export { renderFontNode, testRenderFontNode }
