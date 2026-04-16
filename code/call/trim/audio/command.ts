export function buildCommandToTrimAudio(input: {
  inputPath: string
  outputPath: string
  start?: string
  end?: string
  duration?: string
}): { bin: 'ffmpeg'; args: string[] } {
  const args = ['-y', '-i', input.inputPath]
  if (input.start) args.push('-ss', input.start)
  if (input.end) args.push('-to', input.end)
  if (input.duration && !input.end)
    args.push('-t', input.duration)
  args.push('-c', 'copy', input.outputPath)
  return { bin: 'ffmpeg', args }
}
