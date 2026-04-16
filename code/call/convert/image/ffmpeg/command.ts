import path from 'node:path'

export function buildCommandToConvertImageWithFfmpeg(input: {
  inputPath: string
  outputPath: string
  outputFormat?: string
  fps?: number
  quality?: number
  loop?: number
}): { bin: 'ffmpeg'; args: string[] } {
  const outFmt =
    input.outputFormat ??
    path.extname(input.outputPath).slice(1).toLowerCase()
  const args: string[] = ['-y', '-i', input.inputPath]
  if (input.fps) args.push('-r', String(input.fps))

  switch (outFmt) {
    case 'gif':
      args.push(
        '-vf',
        'split[a][b];[a]palettegen[p];[b][p]paletteuse',
      )
      if (input.loop != null) args.push('-loop', String(input.loop))
      break
    case 'webp':
      args.push('-loop', String(input.loop ?? 0))
      if (input.quality != null)
        args.push('-q:v', String(input.quality))
      break
    case 'apng':
      args.push('-f', 'apng', '-plays', String(input.loop ?? 0))
      break
    case 'mp4':
      args.push('-pix_fmt', 'yuv420p', '-movflags', '+faststart')
      if (input.quality != null) {
        const crf = Math.max(
          0,
          Math.min(51, Math.round(51 - input.quality * 0.51)),
        )
        args.push('-crf', String(crf))
      }
      break
    case 'webm':
      args.push('-pix_fmt', 'yuv420p')
      if (input.quality != null)
        args.push(
          '-crf',
          String(63 - Math.round(input.quality * 0.63)),
        )
      break
  }
  args.push(input.outputPath)
  return { bin: 'ffmpeg', args }
}
