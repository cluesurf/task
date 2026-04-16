import fs from 'node:fs/promises'
import path from 'node:path'
import { runCommandSequence } from '~/code/tool/node/command'
import { buildSubsetFontCommand } from './command'
import { ensureParentDir } from '~/code/tool/node/file'

export type SubsetFontNodeInput = {
  input: { file: { path: string } }
  output: { file: { path: string } }
  text?: string
  unicodes?: string
  layoutFeatures?: string
  flavor?: string
}

export type SubsetFontNodeOutput = {
  file: { path: string }
  sizeBefore: number
  sizeAfter: number
}

export async function subsetFontNode(
  source: SubsetFontNodeInput,
): Promise<SubsetFontNodeOutput> {
  const inputPath = source.input.file.path
  const outputPath = source.output.file.path

  if (!source.text && !source.unicodes) {
    throw new Error(
      'subset font: pass at least one of --text or --unicodes',
    )
  }

  await ensureParentDir(outputPath)
  const { size: sizeBefore } = await fs.stat(inputPath)

  await runCommandSequence(
    buildSubsetFontCommand({
      input: inputPath,
      output: outputPath,
      text: source.text,
      unicodes: source.unicodes,
      layoutFeatures: source.layoutFeatures,
      flavor: source.flavor,
    }),
  )

  const { size: sizeAfter } = await fs.stat(outputPath)
  return { file: { path: outputPath }, sizeBefore, sizeAfter }
}
