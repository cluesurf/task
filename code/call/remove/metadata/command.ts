/**
 * Pure argv builders for `task remove metadata`. Two backends:
 * ffmpeg for audio/video containers, exiftool for everything else.
 */

export const FFMPEG_EXTS = new Set([
  '.mp3', '.wav', '.flac', '.ogg', '.opus', '.m4a', '.aac',
  '.mp4', '.mov', '.mkv', '.webm', '.avi', '.m4v',
])

export function buildCommandToRemoveMetadataFfmpeg(input: {
  inputPath: string
  outputPath: string
}): { bin: 'ffmpeg'; args: string[] } {
  return {
    bin: 'ffmpeg',
    args: [
      '-y',
      '-i',
      input.inputPath,
      '-map_metadata',
      '-1',
      '-c',
      'copy',
      input.outputPath,
    ],
  }
}

export function buildCommandToRemoveMetadataExiftool(input: {
  filePath: string
}): { bin: 'exiftool'; args: string[] } {
  return {
    bin: 'exiftool',
    args: ['-all=', '-overwrite_original', input.filePath],
  }
}
