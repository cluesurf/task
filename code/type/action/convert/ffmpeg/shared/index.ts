import {
  FfmpegCodecAudio,
  FfmpegCodecSubtitle,
  FfmpegCodecVideo,
  FfmpegStrictOption,
} from '~/code/type/object/ffmpeg/index'

export type AddAudioToVideoWithFfmpeg = {
  inputVideoPath: string
  inputAudioPath: string
  outputPath: string
  audioCodec: string
  fit: boolean
}
export type CompressMp4WithFfmpeg = {
  input: {
    format: string
    file: {
      path: string
    }
  }
  output: {
    format: string
    file: {
      path: string
    }
  }
  audioCodec?: FfmpegCodecAudio
  videoCodec?: FfmpegCodecVideo
}
export type ConvertVideoToAudioWithFfmpeg = {
  inputPath: string
  outputPath: string
}
export type ConvertVideoWithFfmpegBase = {
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
export type RemoveAudioFromVideoWithFfmpeg = {
  inputPath: string
  outputPath: string
}
