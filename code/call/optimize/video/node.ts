/**
 * `task optimize video` -- re-encode a video at a target quality
 * / size envelope. Wraps the ffmpeg recipe in `./command.ts`.
 */

import { ensureParentDir } from '~/code/tool/node/file'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { buildCommandToOptimizeVideo } from './command'

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
  await ensureParentDir(outputPath)

  const command = buildCommandToOptimizeVideo({
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
  })
  await spawnAndWait({
    verb: 'optimize video',
    bin: command.bin,
    args: command.args,
  })

  return { file: { path: outputPath } }
}

export default optimizeVideoNode
