/**
 * `task shape font` -- shell out to HarfBuzz's `hb-shape`. Prints
 * the glyph sequence to stdout (pretty/text modes) and also
 * returns it in the node output for JSON consumers.
 */

import type { ShapeFontNodeLocalInput } from '~/code/form/action/shape/font/node'
import {
  ShapeFontNodeInputParser,
  ShapeFontNodeLocalInputParser,
  ShapeFontNodeOutputParser,
} from '~/code/form/action/shape/font/node/take'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndCapture } from '~/code/tool/node/spawn'
import { getLoggingStyle } from '~/code/tool/node/log'
import { buildShapeFontCommand } from './command'

async function runLocal(input: ShapeFontNodeLocalInput) {
  const sequence = buildShapeFontCommand({
    input: input.input.file.path,
    text: input.text,
    features: input.features,
    script: input.script,
    language: input.language,
    direction: input.direction,
  })
  const cmd = sequence.call[0]!
  const stdout = await spawnAndCapture({
    verb: 'shape font',
    bin: cmd.link[0]!,
    args: cmd.link.slice(1),
  })
  const glyphs = stdout.trim()

  if (
    getLoggingStyle() === 'pretty' ||
    getLoggingStyle() === 'text'
  ) {
    process.stdout.write(glyphs + '\n')
  }

  return { file: { path: input.input.file.path }, text: input.text, glyphs }
}

const [shapeFontNode, testShapeFontNode] = createNodeHandler({
  parsers: {
    input: ShapeFontNodeInputParser,
    local: ShapeFontNodeLocalInputParser,
    output: ShapeFontNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export default shapeFontNode
export { shapeFontNode, testShapeFontNode }
