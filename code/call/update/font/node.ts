/**
 * `task update font` — compile `.fea` + inject into a font. The
 * heavy lifting is fontTools' `feaLib.builder`, invoked through
 * an inline python snippet so we don't need a separate script
 * file. Input and output stay on the Node side.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { exec } from '~/code/tool/node/process'

export type UpdateFontNodeInput = {
  input: { file: { path: string } }
  output?: { file?: { path?: string } }
  fea: string
}

export type UpdateFontNodeOutput = {
  file: { path: string }
}

export async function updateFontNode(
  source: UpdateFontNodeInput,
): Promise<UpdateFontNodeOutput> {
  const inputPath = source.input.file.path
  const feaPath = source.fea
  const feaAbs = path.resolve(feaPath)

  try {
    await fs.access(feaAbs)
  } catch {
    throw new Error(
      `update font: --fea file not found at "${feaPath}"`,
    )
  }

  const ext = path.extname(inputPath)
  const defaultOut =
    inputPath.replace(new RegExp(`\\${ext}$`, 'i'), '') + `.updated${ext}`
  const outputPath = source.output?.file?.path ?? defaultOut
  await fs.mkdir(path.dirname(outputPath), { recursive: true })

  // Inline python: load the font, add features, save to output.
  // `addOpenTypeFeatures` mutates GSUB/GPOS in place and raises
  // FeatureLibError on parse failures, which surfaces here as a
  // non-zero exit via exec().
  const script = `
import sys
from fontTools.ttLib import TTFont
from fontTools.feaLib.builder import addOpenTypeFeatures
font_path, fea_path, out_path = sys.argv[1], sys.argv[2], sys.argv[3]
font = TTFont(font_path)
addOpenTypeFeatures(font, fea_path)
font.save(out_path)
`
  await exec(['python3', '-c', script, inputPath, feaAbs, outputPath])

  return { file: { path: outputPath } }
}
