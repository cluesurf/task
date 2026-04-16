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

export function buildCommandToOptimizeVideo({
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
}: BuildOptimizeVideoInput): { bin: 'ffmpeg'; args: string[] } {
  const args: string[] = ['-nostdin', '-y', '-i', input]

  args.push('-vcodec', videoCodec)
  args.push('-crf', String(crf))
  args.push('-preset', preset)
  args.push('-vf', `scale=${width}:-2`)
  args.push('-pix_fmt', pixelFormat)

  if (faststart) {
    args.push('-movflags', '+faststart')
  }

  if (silent) {
    args.push('-an')
  } else {
    args.push('-acodec', audioCodec, '-b:a', audioBitrate)
  }

  args.push(output)
  return { bin: 'ffmpeg', args }
}
