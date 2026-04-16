/**
 * Pure argv builder for `task convert audio` -- ffmpeg audio
 * re-encoding. The output extension picks the codec; `--bitrate`
 * is an optional knob for lossy targets.
 */

export function buildCommandToConvertAudio(input: {
  inputPath: string
  outputPath: string
  bitrate?: string
}): { bin: 'ffmpeg'; args: string[] } {
  const args: string[] = ['-y', '-i', input.inputPath]
  if (input.bitrate) args.push('-b:a', input.bitrate)
  args.push(input.outputPath)
  return { bin: 'ffmpeg', args }
}
