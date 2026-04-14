/**
 * Pure ffmpeg argv builder for `task optimize video`.
 *
 * Recipe defaults (all overridable):
 *   - libx264 + CRF 20 + slow preset
 *   - scale W:-2 keeps aspect ratio + even-pixel mod-2 fix
 *   - yuv420p for max device support
 *   - faststart (moov atom up front) for streaming
 *   - AAC @ 128k stereo audio
 *
 * Pass `silent: true` to drop audio (`-an`).
 */

import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'

export type BuildOptimizeVideoInput = {
  input: string
  output: string
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

export function buildOptimizeVideoCommand({
  input,
  output,
  videoCodec = 'libx264',
  crf = 20,
  preset = 'slow',
  width = 1920,
  pixelFormat = 'yuv420p',
  audioCodec = 'aac',
  audioBitrate = '128k',
  faststart = true,
  silent = false,
}: BuildOptimizeVideoInput) {
  const cmd = getCommand('ffmpeg')

  cmd.link.push('-nostdin', '-y', '-i', input)

  cmd.link.push('-vcodec', videoCodec)
  cmd.link.push('-crf', String(crf))
  cmd.link.push('-preset', preset)
  cmd.link.push('-vf', `scale=${width}:-2`)
  cmd.link.push('-pix_fmt', pixelFormat)

  if (faststart) {
    cmd.link.push('-movflags', '+faststart')
  }

  if (silent) {
    cmd.link.push('-an')
  } else {
    cmd.link.push('-acodec', audioCodec, '-b:a', audioBitrate)
  }

  cmd.link.push(output)
  return buildCommandSequence(cmd)
}
