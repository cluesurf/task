import fs from 'node:fs/promises'
import path from 'node:path'
import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'
import { runCommandSequence } from '~/code/tool/node/command'

export type CompressVideoNodeInput = {
  input: { file: { path: string } }
  output: { file: { path: string } }
  crf?: string
  preset?: string
}

export async function compressVideoNode(source: CompressVideoNodeInput) {
  const outputPath = source.output.file.path
  await fs.mkdir(path.dirname(outputPath), { recursive: true })

  const cmd = getCommand('ffmpeg')
  cmd.link.push(
    '-y',
    '-i',
    source.input.file.path,
    '-c:v',
    'libx264',
    '-crf',
    source.crf ?? '28',
    '-preset',
    source.preset ?? 'medium',
    '-c:a',
    'aac',
    '-b:a',
    '128k',
    outputPath,
  )
  await runCommandSequence(buildCommandSequence(cmd))
  return { file: { path: outputPath } }
}
