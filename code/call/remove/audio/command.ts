/**
 * Pure argv builder for `task remove audio`. Assembles ffmpeg
 * flags to strip the audio track via `-an` while copying the
 * video stream losslessly.
 */

export function buildCommandToRemoveAudio(input: {
  inputPath: string
  outputPath: string
}): { bin: 'ffmpeg'; args: string[] } {
  return {
    bin: 'ffmpeg',
    args: [
      '-y',
      '-i',
      input.inputPath,
      '-c',
      'copy',
      '-an',
      input.outputPath,
    ],
  }
}
