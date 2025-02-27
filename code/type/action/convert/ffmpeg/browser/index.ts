import {
  FfmpegCodecAudio,
  FfmpegCodecSubtitle,
  FfmpegCodecVideo,
  FfmpegFormat,
  FfmpegStrictOption,
} from '~/code/type/object/ffmpeg/index'
import {
  FileContent,
  FileContentWithSha256,
} from '~/code/type/object/file/index'

export type ConvertVideoWithFfmpegBrowserInput =
  | ConvertVideoWithFfmpegBrowserRemoteInput
  | ConvertVideoWithFfmpegBrowserLocalInput
export type ConvertVideoWithFfmpegBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: FfmpegFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: FfmpegFormat
  }
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
export type ConvertVideoWithFfmpegBrowserOutput = {
  file: FileContent
}
export type ConvertVideoWithFfmpegBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: FfmpegFormat
    file: FileContentWithSha256
  }
  output: {
    format: FfmpegFormat
  }
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
