import {
  FfmpegCodecAudio,
  FfmpegCodecSubtitle,
  FfmpegCodecVideo,
  FfmpegFormat,
  FfmpegStrictOption,
} from '~/code/form/object/ffmpeg/index'
import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file/index'

export type ConvertVideoWithFfmpegNodeClientInput = {
  handle: 'client'
  input: {
    format: FfmpegFormat
    file: FileInputPath | FileContentWithSha256
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
export type ConvertVideoWithFfmpegNodeExternalInput = {
  handle: 'external'
  input: {
    format: FfmpegFormat
    file: RemoteInputPath | FileContentWithSha256
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
export type ConvertVideoWithFfmpegNodeInput =
  | ConvertVideoWithFfmpegNodeRemoteInput
  | ConvertVideoWithFfmpegNodeLocalExternalInput
  | ConvertVideoWithFfmpegNodeLocalInternalInput
export type ConvertVideoWithFfmpegNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: FfmpegFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: FfmpegFormat
    file?: LocalOutputPath
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
export type ConvertVideoWithFfmpegNodeLocalInput = {
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
export type ConvertVideoWithFfmpegNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: FfmpegFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: FfmpegFormat
    file?: LocalOutputPath
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
export type ConvertVideoWithFfmpegNodeOutput = {
  file: FilePath
}
export type ConvertVideoWithFfmpegNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: FfmpegFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: FfmpegFormat
    file?: LocalOutputPath
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
