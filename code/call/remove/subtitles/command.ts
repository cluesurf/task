export function buildCommandToRemoveSubtitles(input: {
  inputPath: string
  outputPath: string
}): { bin: 'ffmpeg'; args: string[] } {
  return {
    bin: 'ffmpeg',
    args: ['-y', '-i', input.inputPath, '-c', 'copy', '-sn', input.outputPath],
  }
}
