import type { RemoveSubtitlesNodeInput } from './shared'

export function buildCommandToRemoveSubtitles(
  input: RemoveSubtitlesNodeInput,
  outputPath: string,
): { bin: 'ffmpeg'; args: string[] } {
  return {
    bin: 'ffmpeg',
    args: ['-y', '-i', input.input, '-c', 'copy', '-sn', outputPath],
  }
}
