/**
 * `task combine` — fuse a still image and an audio track into a
 * single video file. Loops the image for the audio's duration
 * (`-loop 1` + `-shortest`), encoding to h264/aac by default.
 *
 * The `scale` filter rounds to even pixels so libx264 accepts
 * arbitrary source images; the rest of the encoder defaults
 * mirror `deck/etch/scripts/utilities/image-audio.sh`.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { runCommandSequence } from '~/code/tool/node/command'
import { buildCombineCommand } from './command'

export type CombineNodeInput = {
  input: { file: { path: string } }
  audio: { file: { path: string } }
  output: { file: { path: string } }
  videoCodec?: string
  audioCodec?: string
  audioBitrate?: string
  sampleRate?: number
  pixelFormat?: string
  tune?: string
}

export type CombineNodeOutput = {
  file: { path: string }
}

export async function combineNode(
  source: CombineNodeInput,
): Promise<CombineNodeOutput> {
  const outputPath = source.output.file.path
  await fs.mkdir(path.dirname(outputPath), { recursive: true })

  await runCommandSequence(
    buildCombineCommand({
      image: source.input.file.path,
      audio: source.audio.file.path,
      output: outputPath,
      videoCodec: source.videoCodec,
      audioCodec: source.audioCodec,
      audioBitrate: source.audioBitrate,
      sampleRate: source.sampleRate,
      pixelFormat: source.pixelFormat,
      tune: source.tune,
    }),
  )

  return { file: { path: outputPath } }
}
