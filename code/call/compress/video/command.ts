export function buildCommandToCompressVideo(input: {
  inputPath: string
  outputPath: string
  crf?: string
  preset?: string
}): { bin: string; args: string[] } {
  const bin = 'ffmpeg'
  const args: string[] = [
    '-y',
    '-i',
    input.inputPath,
    '-c:v',
    'libx264',
    '-crf',
    input.crf ?? '28',
    '-preset',
    input.preset ?? 'medium',
    '-c:a',
    'aac',
    '-b:a',
    '128k',
    input.outputPath,
  ]
  return { bin, args }
}
