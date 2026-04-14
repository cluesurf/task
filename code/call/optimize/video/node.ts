/**
 * `task optimize video` — re-encode a video at a target quality
 * / size envelope. Wraps the ffmpeg recipe in `./command.ts`.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { runCommandSequence } from '~/code/tool/node/command'
import { buildOptimizeVideoCommand } from './command'

export type OptimizeVideoNodeInput = {
  input: { file: { path: string } }
  output: { file: { path: string } }
  videoCodec?: string
  crf?: number
  preset?: string
  width?: number
  pixelFormat?: string
  audioCodec?: string
  audioBitrate?: string
  faststart?: boolean
  silent?: boolean
}

export type OptimizeVideoNodeOutput = {
  file: { path: string }
}

export async function optimizeVideoNode(
  source: OptimizeVideoNodeInput,
): Promise<OptimizeVideoNodeOutput> {
  const outputPath = source.output.file.path
  await fs.mkdir(path.dirname(outputPath), { recursive: true })

  await runCommandSequence(
    buildOptimizeVideoCommand({
      input: source.input.file.path,
      output: outputPath,
      videoCodec: source.videoCodec,
      crf: source.crf,
      preset: source.preset,
      width: source.width,
      pixelFormat: source.pixelFormat,
      audioCodec: source.audioCodec,
      audioBitrate: source.audioBitrate,
      faststart: source.faststart,
      silent: source.silent,
    }),
  )

  return { file: { path: outputPath } }
}
