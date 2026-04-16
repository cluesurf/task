/**
 * Pure argv builder for `task normalize audio`. Assembles ffmpeg
 * flags for the loudnorm filter with EBU R128 defaults.
 */

export function buildNormalizeAudioCommand(input: {
  inputPath: string
  outputPath: string
  target?: string
  peak?: string
  range?: string
}): { bin: string; args: string[] } {
  const target = input.target ?? '-16'
  const peak = input.peak ?? '-1'
  const range = input.range ?? '11'
  const filter = `loudnorm=I=${target}:TP=${peak}:LRA=${range}`

  const bin = 'ffmpeg'
  const args: string[] = [
    '-y',
    '-i',
    input.inputPath,
    '-af',
    filter,
    input.outputPath,
  ]
  return { bin, args }
}
