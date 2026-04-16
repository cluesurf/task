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
import { runCommandSequence } from '~/code/tool/node/command'
import { buildRenderFontCommand } from './command'

async function runLocal(input: RenderFontNodeLocalInput) {
  const outputPath = input.output.file.path
  await ensureParentDir(outputPath)

  await runCommandSequence(
    buildRenderFontCommand({
      input: input.input.file.path,
      output: outputPath,
      text: input.text,
      fontSize: input.fontSize,
      features: input.features,
    }),
  )

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

export { renderFontNode, testRenderFontNode }
