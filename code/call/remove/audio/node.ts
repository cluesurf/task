import fs from 'node:fs/promises'
import path from 'node:path'
import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'
import { runCommandSequence } from '~/code/tool/node/command'

export type RemoveAudioNodeInput = {
  input: { file: { path: string } }
  output: { file: { path: string } }
}

export async function removeAudioNode(source: RemoveAudioNodeInput) {
  const outputPath = source.output.file.path
  await fs.mkdir(path.dirname(outputPath), { recursive: true })

  const cmd = getCommand('ffmpeg')
  cmd.link.push(
    '-y',
    '-i',
    source.input.file.path,
    '-c',
    'copy',
    '-an',
    outputPath,
  )
  await runCommandSequence(buildCommandSequence(cmd))
  return { file: { path: outputPath } }
}
