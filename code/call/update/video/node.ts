/**
 * `task update video --subtitles subs.srt` — mux the sidecar
 * subtitle stream into the video. For MP4, ffmpeg picks
 * `mov_text` automatically via the container; for MKV, sub format
 * pass-through works out of the box.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { ensureParentDir } from '~/code/tool/node/file'
import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'
import { runCommandSequence } from '~/code/tool/node/command'

export type UpdateVideoNodeInput = {
  input: { file: { path: string } }
  output?: { file?: { path?: string } }
  subtitles?: string
}

export async function updateVideoNode(source: UpdateVideoNodeInput) {
  if (!source.subtitles) {
    throw new Error('update video: pass --subtitles <path>')
  }

  const inputPath = source.input.file.path
  const outputPath = source.output?.file?.path ?? inputPath
  if (outputPath === inputPath) {
    throw new Error(
      'update video: pass -o <out.mp4> — ffmpeg cannot remux in place',
    )
  }
  await ensureParentDir(outputPath)

  const cmd = getCommand('ffmpeg')
  cmd.link.push(
    '-y',
    '-i',
    inputPath,
    '-i',
    source.subtitles,
    '-map',
    '0',
    '-map',
    '1',
    '-c',
    'copy',
    '-c:s',
    'mov_text',
    outputPath,
  )
  await runCommandSequence(buildCommandSequence(cmd))
  return { file: { path: outputPath } }
}
