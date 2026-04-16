export function buildCommandToCompressAudio(input: {
  inputPath: string
  outputPath: string
  bitrate?: string
}): { bin: string; args: string[] } {
  const bin = 'ffmpeg'
  const args: string[] = [
    '-y',
    '-i',
    input.inputPath,
    '-b:a',
    input.bitrate ?? '128k',
    input.outputPath,
  ]
  return { bin, args }
}
