/**
 * Pure argv builder for `task get duration`. Shells out to
 * ffprobe to read the first audio (or video) stream's duration.
 */

export function buildFfprobeDurationCommand(input: {
  filePath: string
  stream: string
}): { bin: 'ffprobe'; args: string[] } {
  return {
    bin: 'ffprobe',
    args: [
      '-v',
      'quiet',
      '-select_streams',
      input.stream,
      '-show_entries',
      'stream=duration',
      '-of',
      'default=noprint_wrappers=1:nokey=1',
      input.filePath,
    ],
  }
}
