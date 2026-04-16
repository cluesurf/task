/**
 * `task subset font` -- reduces a font to only the glyphs needed
 * for the given text or codepoint ranges via `pyftsubset`.
 */

import fs from 'node:fs/promises'
import type { SubsetFontNodeLocalInput } from '~/code/form/action/subset/font/node'
import {
  SubsetFontNodeInputParser,
  SubsetFontNodeLocalInputParser,
  SubsetFontNodeOutputParser,
} from '~/code/form/action/subset/font/node/take'
import { ensureParentDir } from '~/code/tool/node/file'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { buildSubsetFontCommand } from './command'

async function runLocal(input: SubsetFontNodeLocalInput) {
  const inputPath = input.input.file.path
  const outputPath = input.output.file.path

  if (!input.text && !input.unicodes) {
    throw new Error(
      'subset font: pass at least one of --text or --unicodes',
    )
  }

  await ensureParentDir(outputPath)
  const { size: sizeBefore } = await fs.stat(inputPath)

  const { bin, args } = buildSubsetFontCommand({
    input: inputPath,
    output: outputPath,
    text: input.text,
    unicodes: input.unicodes,
    layoutFeatures: input.layoutFeatures,
    flavor: input.flavor,
  })
  await spawnAndWait({ verb: 'subset', bin, args })

  const { size: sizeAfter } = await fs.stat(outputPath)
  return { file: { path: outputPath }, sizeBefore, sizeAfter }
}

const [subsetFontNode, testSubsetFontNode] = createNodeHandler({
  parsers: {
    input: SubsetFontNodeInputParser,
    local: SubsetFontNodeLocalInputParser,
    output: SubsetFontNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export default subsetFontNode
export { subsetFontNode, testSubsetFontNode }
