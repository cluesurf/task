import {
  FfmpegCodecAudio,
  FfmpegCodecSubtitle,
  FfmpegCodecVideo,
  FfmpegFormat,
  FfmpegStrictOption,
} from '~/code/form/object/ffmpeg/index'
import { LocalPath } from '~/code/form/object/file/index'

export type ConvertVideoWithFfmpegCommandInput = {
  input: {
    format: FfmpegFormat
    file: LocalPath
  }
  output: {
    format: FfmpegFormat
    file: LocalPath
  }
  pathScope?: string
  audioCodec?: FfmpegCodecAudio
  videoCodec?: FfmpegCodecVideo
  audioBitRate?: number
  videoBitRate?: number
  frameRate?: number
  startTime?: number | string
  endTime?: number | string
  strict?: FfmpegStrictOption
  overwrite?: boolean
  progress?: boolean
  scaleWidth?: number
  scaleHeight?: number
  audioChannels?: number
  audioSamplingFrequency?: number
  subtitleCodec?: FfmpegCodecSubtitle
  duration?: number | string
  rotation?: number
}
