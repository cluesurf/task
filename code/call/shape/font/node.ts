/**
 * `task shape font` — shell out to HarfBuzz's `hb-shape`. Prints
 * the glyph sequence to stdout (pretty/text modes) and also
 * returns it in the node output for JSON consumers.
 */

import { exec } from '~/code/tool/node/process'
import { getLoggingStyle } from '~/code/tool/node/log'
import { buildShapeFontCommand } from './command'

export type ShapeFontNodeInput = {
  input: { file: { path: string } }
  text: string
  features?: string
  script?: string
  language?: string
  direction?: string
}

export type ShapeFontNodeOutput = {
  text: string
  glyphs: string
}

export async function shapeFontNode(
  source: ShapeFontNodeInput,
): Promise<ShapeFontNodeOutput> {
  const sequence = buildShapeFontCommand({
    input: source.input.file.path,
    text: source.text,
    features: source.features,
    script: source.script,
    language: source.language,
    direction: source.direction,
  })
  const cmd = sequence.call[0]!
  const { stdout } = await exec(cmd.link)
  const glyphs = stdout.trim()

  if (getLoggingStyle() === 'pretty' || getLoggingStyle() === 'text') {
    process.stdout.write(glyphs + '\n')
  }

  return { text: source.text, glyphs }
}
