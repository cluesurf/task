/**
 * Pure argv builder for `task resize video` -- ffmpeg `scale`
 * filter. Using `-2` for an omitted dimension preserves aspect
 * ratio while keeping the kept dimension divisible by 2
 * (required by H.264).
 */

export function buildCommandToResizeVideo(input: {
  inputPath: string
  outputPath: string
  width?: number
  height?: number
}): { bin: 'ffmpeg'; args: string[] } {
  const w = input.width ?? -2
  const h = input.height ?? -2
  const filter = `scale=${w}:${h}`
  const args = ['-y', '-i', input.inputPath, '-vf', filter, input.outputPath]
  return { bin: 'ffmpeg', args }
}
