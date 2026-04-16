/**
 * Pure argv builders for `task split audio`. No execution here.
 */

export function buildSplitAudioSegmentCommand(input: {
  inputPath: string
  outputPath: string
  start: number
  end: number
}): { bin: 'ffmpeg'; args: string[] } {
  return {
    bin: 'ffmpeg',
    args: [
      '-y',
      '-i',
      input.inputPath,
      '-ss',
      String(input.start),
      '-to',
      String(input.end),
      '-c',
      'copy',
      input.outputPath,
    ],
  }
}

export function buildSplitAudioFixedCommand(input: {
  inputPath: string
  pattern: string
  chunkSeconds: number
}): { bin: 'ffmpeg'; args: string[] } {
  return {
    bin: 'ffmpeg',
    args: [
      '-y',
      '-i',
      input.inputPath,
      '-f',
      'segment',
      '-segment_time',
      String(input.chunkSeconds),
      '-c',
      'copy',
      input.pattern,
    ],
  }
}

export function buildSilenceDetectCommand(input: {
  inputPath: string
  db: string
  minDuration: string
}): { bin: 'ffmpeg'; args: string[] } {
  const filter = `silencedetect=noise=${input.db}dB:d=${input.minDuration}`
  return {
    bin: 'ffmpeg',
    args: [
      '-hide_banner',
      '-nostats',
      '-i',
      input.inputPath,
      '-af',
      filter,
      '-f',
      'null',
      '-',
    ],
  }
}
