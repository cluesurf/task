import fs from 'node:fs/promises'
import path from 'node:path'
import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'
import { runCommandSequence } from '~/code/tool/node/command'

export type CompressImageNodeInput = {
  input: { file: { path: string } }
  output?: { file?: { path?: string } }
  quality?: string
}

export async function compressImageNode(source: CompressImageNodeInput) {
  const inputPath = source.input.file.path
  const outputPath = source.output?.file?.path ?? inputPath
  await fs.mkdir(path.dirname(outputPath), { recursive: true })

  const cmd = getCommand('convert')
  cmd.link.push(
    inputPath,
    '-quality',
    source.quality ?? '80',
    outputPath,
  )
  await runCommandSequence(buildCommandSequence(cmd))
  return { file: { path: outputPath } }
}
