import fs from 'node:fs/promises'
import path from 'node:path'
import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'
import { runCommandSequence } from '~/code/tool/node/command'

export type TrimImageNodeInput = {
  input: { file: { path: string } }
  output: { file: { path: string } }
  crop: string
}

export async function trimImageNode(source: TrimImageNodeInput) {
  const parts = source.crop.split(',').map(s => s.trim())
  if (parts.length !== 4 || parts.some(p => !/^\d+$/.test(p))) {
    throw new Error(
      `trim image: --crop must be "x,y,w,h" (got "${source.crop}")`,
    )
  }
  const [x, y, w, h] = parts
  const geometry = `${w}x${h}+${x}+${y}`

  const outputPath = source.output.file.path
  await fs.mkdir(path.dirname(outputPath), { recursive: true })

  const cmd = getCommand('convert')
  cmd.link.push(source.input.file.path, '-crop', geometry, outputPath)
  await runCommandSequence(buildCommandSequence(cmd))
  return { file: { path: outputPath } }
}
