import { FfmpegFormat } from '~/code/type/shared/index.js'
import { testConvertFileInputOutput } from '../../shared.js'
import { getConfig } from '~/code/tool/shared/config.js'

export function testConvertVideoWithFfmpeg(input: any) {
  if (!testConvertFileInputOutput(input)) {
    return false
  }

  const {
    input: { format: a },
    output: { format: b },
  } = input

  if (a === b) {
    return false
  }

  const FFMPEG_FORMAT = getConfig('ffmpeg_format')

  if (!FFMPEG_FORMAT.includes(a as FfmpegFormat)) {
    return false
  }
  if (!FFMPEG_FORMAT.includes(b as FfmpegFormat)) {
    return false
  }
  return true
}
