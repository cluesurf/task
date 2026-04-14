import fs from 'node:fs/promises'
import path from 'node:path'
import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'
import { runCommandSequence } from '~/code/tool/node/command'

export type NormalizeAudioNodeInput = {
  input: { file: { path: string } }
  output: { file: { path: string } }
  target?: string
  peak?: string
  range?: string
}

export async function normalizeAudioNode(source: NormalizeAudioNodeInput) {
  const outputPath = source.output.file.path
  await fs.mkdir(path.dirname(outputPath), { recursive: true })

  const target = source.target ?? '-16'
  const peak = source.peak ?? '-1'
  const range = source.range ?? '11'
  const filter = `loudnorm=I=${target}:TP=${peak}:LRA=${range}`

  const cmd = getCommand('ffmpeg')
  cmd.link.push(
    '-y',
    '-i',
    source.input.file.path,
    '-af',
    filter,
    outputPath,
  )
  await runCommandSequence(buildCommandSequence(cmd))
  return { file: { path: outputPath } }
}
