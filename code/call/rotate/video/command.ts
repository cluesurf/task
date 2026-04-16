const FILTERS: Record<string, string> = {
  '90': 'transpose=1',
  '180': 'transpose=1,transpose=1',
  '270': 'transpose=2',
}

export function buildCommandToRotateVideo(input: {
  inputPath: string
  outputPath: string
  degree: string
}): { bin: string; args: string[] } {
  const filter = FILTERS[input.degree]
  if (!filter) {
    throw new Error(
      `rotate video: --degree must be 90, 180, or 270 (got "${input.degree}")`,
    )
  }

  const bin = 'ffmpeg'
  const args: string[] = [
    '-y',
    '-i',
    input.inputPath,
    '-vf',
    filter,
    input.outputPath,
  ]
  return { bin, args }
}
