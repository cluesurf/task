/**
 * `task resize video` — ffmpeg `scale` filter. Using `-2` for an
 * omitted dimension preserves aspect ratio while keeping the
 * kept dimension divisible by 2 (required by H.264).
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { ensureParentDir } from '~/code/tool/node/file'
import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'
import { runCommandSequence } from '~/code/tool/node/command'

export type ResizeVideoNodeInput = {
  input: { file: { path: string } }
  output: { file: { path: string } }
  width?: number
  height?: number
}

export async function resizeVideoNode(source: ResizeVideoNodeInput) {
  if (!source.width && !source.height) {
    throw new Error('resize video: pass --width and/or --height')
  }
  const outputPath = source.output.file.path
  await ensureParentDir(outputPath)

  const w = source.width ?? -2
  const h = source.height ?? -2
  const filter = `scale=${w}:${h}`

  const cmd = getCommand('ffmpeg')
  cmd.link.push('-y', '-i', source.input.file.path, '-vf', filter, outputPath)
  await runCommandSequence(buildCommandSequence(cmd))
  return { file: { path: outputPath } }
}
