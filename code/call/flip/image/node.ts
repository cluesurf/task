import fs from 'node:fs/promises'
import path from 'node:path'
import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'
import { runCommandSequence } from '~/code/tool/node/command'

export type FlipImageNodeInput = {
  input: { file: { path: string } }
  output: { file: { path: string } }
  horizontal?: boolean
  vertical?: boolean
}

export async function flipImageNode(source: FlipImageNodeInput) {
  if (!source.horizontal && !source.vertical) {
    throw new Error(
      `flip image: pass --horizontal and/or --vertical`,
    )
  }

  const outputPath = source.output.file.path
  await fs.mkdir(path.dirname(outputPath), { recursive: true })

  const cmd = getCommand('convert')
  cmd.link.push(source.input.file.path)
  // ImageMagick: -flop = horizontal (left/right), -flip = vertical (top/bottom).
  if (source.horizontal) cmd.link.push('-flop')
  if (source.vertical) cmd.link.push('-flip')
  cmd.link.push(outputPath)

  await runCommandSequence(buildCommandSequence(cmd))
  return { file: { path: outputPath } }
}
