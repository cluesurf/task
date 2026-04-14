import fs from 'node:fs/promises'
import path from 'node:path'
import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'
import { runCommandSequence } from '~/code/tool/node/command'

export type CompressAudioNodeInput = {
  input: { file: { path: string } }
  output: { file: { path: string } }
  bitrate?: string
}

export async function compressAudioNode(source: CompressAudioNodeInput) {
  const outputPath = source.output.file.path
  await fs.mkdir(path.dirname(outputPath), { recursive: true })

  const cmd = getCommand('ffmpeg')
  cmd.link.push(
    '-y',
    '-i',
    source.input.file.path,
    '-b:a',
    source.bitrate ?? '128k',
    outputPath,
  )
  await runCommandSequence(buildCommandSequence(cmd))
  return { file: { path: outputPath } }
}
