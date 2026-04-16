/**
 * Pure argv builder for `task update video`. Assembles ffmpeg
 * flags to mux a subtitle sidecar into the video container.
 */

export function buildUpdateVideoCommand(input: {
  inputPath: string
  outputPath: string
  subtitles: string
}): { bin: string; args: string[] } {
  const bin = 'ffmpeg'
  const args: string[] = [
    '-y',
    '-i',
    input.inputPath,
    '-i',
    input.subtitles,
    '-map',
    '0',
    '-map',
    '1',
    '-c',
    'copy',
    '-c:s',
    'mov_text',
    input.outputPath,
  ]
  return { bin, args }
}
