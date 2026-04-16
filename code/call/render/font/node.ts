import fs from 'node:fs/promises'
import path from 'node:path'
import { runCommandSequence } from '~/code/tool/node/command'
import { buildRenderFontCommand } from './command'
import { ensureParentDir } from '~/code/tool/node/file'

export type RenderFontNodeInput = {
  input: { file: { path: string } }
  output: { file: { path: string } }
  text: string
  fontSize?: number
  features?: string
}

export type RenderFontNodeOutput = {
  file: { path: string }
}

export async function renderFontNode(
  source: RenderFontNodeInput,
): Promise<RenderFontNodeOutput> {
  const outputPath = source.output.file.path
  await ensureParentDir(outputPath)

  await runCommandSequence(
    buildRenderFontCommand({
      input: source.input.file.path,
      output: outputPath,
      text: source.text,
      fontSize: source.fontSize,
      features: source.features,
    }),
  )

  return { file: { path: outputPath } }
}
