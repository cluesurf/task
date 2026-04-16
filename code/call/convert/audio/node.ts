import fs from 'node:fs/promises'
import path from 'node:path'
import { ensureParentDir } from '~/code/tool/node/file'
import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'
import { runCommandSequence } from '~/code/tool/node/command'

export type ConvertAudioNodeInput = {
  input: { file: { path: string } }
  output: { file: { path: string } }
  bitrate?: string
}

export async function convertAudioNode(source: ConvertAudioNodeInput) {
  const outputPath = source.output.file.path
  await ensureParentDir(outputPath)

  const cmd = getCommand('ffmpeg')
  cmd.link.push('-y', '-i', source.input.file.path)
  if (source.bitrate) cmd.link.push('-b:a', source.bitrate)
  cmd.link.push(outputPath)

  await runCommandSequence(buildCommandSequence(cmd))
  return { file: { path: outputPath } }
}
