import fs from 'node:fs/promises'
import path from 'node:path'
import { ensureParentDir } from '~/code/tool/node/file'
import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'
import { runCommandSequence } from '~/code/tool/node/command'

export type TrimAudioNodeInput = {
  input: { file: { path: string } }
  output: { file: { path: string } }
  start?: string
  end?: string
  duration?: string
}

export async function trimAudioNode(source: TrimAudioNodeInput) {
  const outputPath = source.output.file.path
  await ensureParentDir(outputPath)

  const cmd = getCommand('ffmpeg')
  cmd.link.push('-y', '-i', source.input.file.path)
  if (source.start) cmd.link.push('-ss', source.start)
  if (source.end) cmd.link.push('-to', source.end)
  if (source.duration && !source.end) cmd.link.push('-t', source.duration)
  // Copy codec when the output container can hold the input codec —
  // otherwise ffmpeg re-encodes from the output extension.
  cmd.link.push('-c', 'copy', outputPath)

  await runCommandSequence(buildCommandSequence(cmd))
  return { file: { path: outputPath } }
}
