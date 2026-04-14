import fs from 'node:fs/promises'
import path from 'node:path'
import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'
import { runCommandSequence } from '~/code/tool/node/command'

export type TrimVideoNodeInput = {
  input: { file: { path: string } }
  output: { file: { path: string } }
  start?: string
  end?: string
  duration?: string
  reencode?: boolean
}

export async function trimVideoNode(source: TrimVideoNodeInput) {
  const outputPath = source.output.file.path
  await fs.mkdir(path.dirname(outputPath), { recursive: true })

  const cmd = getCommand('ffmpeg')
  cmd.link.push('-y', '-i', source.input.file.path)
  if (source.start) cmd.link.push('-ss', source.start)
  if (source.end) cmd.link.push('-to', source.end)
  if (source.duration && !source.end) cmd.link.push('-t', source.duration)
  if (!source.reencode) cmd.link.push('-c', 'copy')
  cmd.link.push(outputPath)

  await runCommandSequence(buildCommandSequence(cmd))
  return { file: { path: outputPath } }
}
