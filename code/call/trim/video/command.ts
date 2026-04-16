export function buildCommandToTrimVideo(input: {
  inputPath: string
  outputPath: string
  start?: string
  end?: string
  duration?: string
  reencode?: boolean
}): { bin: 'ffmpeg'; args: string[] } {
  const args = ['-y', '-i', input.inputPath]
  if (input.start) args.push('-ss', input.start)
  if (input.end) args.push('-to', input.end)
  if (input.duration && !input.end)
    args.push('-t', input.duration)
  if (!input.reencode) args.push('-c', 'copy')
  args.push(input.outputPath)
  return { bin: 'ffmpeg', args }
}
