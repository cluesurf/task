import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  FfmpegCodecAudio,
  FfmpegCodecContentKey,
  FfmpegCodecData,
  FfmpegCodecSubtitle,
  FfmpegCodecVideo,
  FfmpegDecoderAudio,
  FfmpegDecoderContentKey,
  FfmpegDecoderData,
  FfmpegDecoderSubtitle,
  FfmpegDecoderVideo,
  FfmpegEncoderAudio,
  FfmpegEncoderContentKey,
  FfmpegEncoderData,
  FfmpegEncoderSubtitle,
  FfmpegEncoderVideo,
  FfmpegFormat,
  FfmpegFormatContentKey,
  FfmpegFormatData,
  FfmpegStrictOption,
  FfmpegStrictOptionData,
} from '~/code/type/object/ffmpeg/index'
import {
  FFMPEG_CODEC_CONTENT_KEY,
  FFMPEG_DECODER_CONTENT_KEY,
  FFMPEG_ENCODER_CONTENT_KEY,
  FFMPEG_FORMAT_CONTENT_KEY,
} from '~/code/type/object/ffmpeg/constants'

let FfmpegCodecAudioModel: z.ZodType<FfmpegCodecAudio>

export const FfmpegCodecAudioParser = () => {
  if (!FfmpegCodecAudioModel) {
    FfmpegCodecAudioModel = z.enum(
      LOAD('ffmpeg_codec_audio') as readonly [string, ...string[]],
    ) as z.ZodType<FfmpegCodecAudio>
  }
  return FfmpegCodecAudioModel!
}

export const FfmpegCodecContentKeyParser: z.ZodType<FfmpegCodecContentKey> =
  z.enum(
    FFMPEG_CODEC_CONTENT_KEY as [
      FfmpegCodecContentKey,
      ...FfmpegCodecContentKey[],
    ],
  )

let FfmpegCodecDataModel: z.ZodType<FfmpegCodecData>

export const FfmpegCodecDataParser = (): z.ZodType<FfmpegCodecData> => {
  if (!FfmpegCodecDataModel) {
    FfmpegCodecDataModel = z.object({
      label: z.string(),
      type: z.optional(z.string()),
      supportsDecoding: z.boolean(),
      supportsEncoding: z.boolean(),
      intraFrameOnly: z.boolean(),
      lossy: z.boolean(),
      lossless: z.boolean(),
    }) as z.ZodType<FfmpegCodecData>
  }
  return FfmpegCodecDataModel!
}

let FfmpegCodecSubtitleModel: z.ZodType<FfmpegCodecSubtitle>

export const FfmpegCodecSubtitleParser = () => {
  if (!FfmpegCodecSubtitleModel) {
    FfmpegCodecSubtitleModel = z.enum(
      LOAD('ffmpeg_codec_subtitle') as readonly [string, ...string[]],
    ) as z.ZodType<FfmpegCodecSubtitle>
  }
  return FfmpegCodecSubtitleModel!
}

let FfmpegCodecVideoModel: z.ZodType<FfmpegCodecVideo>

export const FfmpegCodecVideoParser = () => {
  if (!FfmpegCodecVideoModel) {
    FfmpegCodecVideoModel = z.enum(
      LOAD('ffmpeg_codec_video') as readonly [string, ...string[]],
    ) as z.ZodType<FfmpegCodecVideo>
  }
  return FfmpegCodecVideoModel!
}

let FfmpegDecoderAudioModel: z.ZodType<FfmpegDecoderAudio>

export const FfmpegDecoderAudioParser = () => {
  if (!FfmpegDecoderAudioModel) {
    FfmpegDecoderAudioModel = z.enum(
      LOAD('ffmpeg_decoder_audio') as readonly [string, ...string[]],
    ) as z.ZodType<FfmpegDecoderAudio>
  }
  return FfmpegDecoderAudioModel!
}

export const FfmpegDecoderContentKeyParser: z.ZodType<FfmpegDecoderContentKey> =
  z.enum(
    FFMPEG_DECODER_CONTENT_KEY as [
      FfmpegDecoderContentKey,
      ...FfmpegDecoderContentKey[],
    ],
  )

let FfmpegDecoderDataModel: z.ZodType<FfmpegDecoderData>

export const FfmpegDecoderDataParser =
  (): z.ZodType<FfmpegDecoderData> => {
    if (!FfmpegDecoderDataModel) {
      FfmpegDecoderDataModel = z.object({
        label: z.string(),
        type: z.string(),
        frameLevelMultithreading: z.boolean(),
        sliceLevelMultithreading: z.boolean(),
        experimental: z.boolean(),
        supportsDrawHorizontalBand: z.boolean(),
        supportsDirectRenderingMethod1: z.boolean(),
      }) as z.ZodType<FfmpegDecoderData>
    }
    return FfmpegDecoderDataModel!
  }

let FfmpegDecoderSubtitleModel: z.ZodType<FfmpegDecoderSubtitle>

export const FfmpegDecoderSubtitleParser = () => {
  if (!FfmpegDecoderSubtitleModel) {
    FfmpegDecoderSubtitleModel = z.enum(
      LOAD('ffmpeg_decoder_subtitle') as readonly [string, ...string[]],
    ) as z.ZodType<FfmpegDecoderSubtitle>
  }
  return FfmpegDecoderSubtitleModel!
}

let FfmpegDecoderVideoModel: z.ZodType<FfmpegDecoderVideo>

export const FfmpegDecoderVideoParser = () => {
  if (!FfmpegDecoderVideoModel) {
    FfmpegDecoderVideoModel = z.enum(
      LOAD('ffmpeg_decoder_video') as readonly [string, ...string[]],
    ) as z.ZodType<FfmpegDecoderVideo>
  }
  return FfmpegDecoderVideoModel!
}

let FfmpegEncoderAudioModel: z.ZodType<FfmpegEncoderAudio>

export const FfmpegEncoderAudioParser = () => {
  if (!FfmpegEncoderAudioModel) {
    FfmpegEncoderAudioModel = z.enum(
      LOAD('ffmpeg_encoder_audio') as readonly [string, ...string[]],
    ) as z.ZodType<FfmpegEncoderAudio>
  }
  return FfmpegEncoderAudioModel!
}

export const FfmpegEncoderContentKeyParser: z.ZodType<FfmpegEncoderContentKey> =
  z.enum(
    FFMPEG_ENCODER_CONTENT_KEY as [
      FfmpegEncoderContentKey,
      ...FfmpegEncoderContentKey[],
    ],
  )

let FfmpegEncoderDataModel: z.ZodType<FfmpegEncoderData>

export const FfmpegEncoderDataParser =
  (): z.ZodType<FfmpegEncoderData> => {
    if (!FfmpegEncoderDataModel) {
      FfmpegEncoderDataModel = z.object({
        label: z.string(),
        type: z.string(),
        frameLevelMultithreading: z.boolean(),
        sliceLevelMultithreading: z.boolean(),
        experimental: z.boolean(),
        supportsDrawHorizontalBand: z.boolean(),
        supportsDirectRenderingMethod1: z.boolean(),
      }) as z.ZodType<FfmpegEncoderData>
    }
    return FfmpegEncoderDataModel!
  }

let FfmpegEncoderSubtitleModel: z.ZodType<FfmpegEncoderSubtitle>

export const FfmpegEncoderSubtitleParser = () => {
  if (!FfmpegEncoderSubtitleModel) {
    FfmpegEncoderSubtitleModel = z.enum(
      LOAD('ffmpeg_encoder_subtitle') as readonly [string, ...string[]],
    ) as z.ZodType<FfmpegEncoderSubtitle>
  }
  return FfmpegEncoderSubtitleModel!
}

let FfmpegEncoderVideoModel: z.ZodType<FfmpegEncoderVideo>

export const FfmpegEncoderVideoParser = () => {
  if (!FfmpegEncoderVideoModel) {
    FfmpegEncoderVideoModel = z.enum(
      LOAD('ffmpeg_encoder_video') as readonly [string, ...string[]],
    ) as z.ZodType<FfmpegEncoderVideo>
  }
  return FfmpegEncoderVideoModel!
}

let FfmpegFormatModel: z.ZodType<FfmpegFormat>

export const FfmpegFormatParser = () => {
  if (!FfmpegFormatModel) {
    FfmpegFormatModel = z.enum(
      LOAD('ffmpeg_format') as readonly [string, ...string[]],
    ) as z.ZodType<FfmpegFormat>
  }
  return FfmpegFormatModel!
}

export const FfmpegFormatContentKeyParser: z.ZodType<FfmpegFormatContentKey> =
  z.enum(
    FFMPEG_FORMAT_CONTENT_KEY as [
      FfmpegFormatContentKey,
      ...FfmpegFormatContentKey[],
    ],
  )

let FfmpegFormatDataModel: z.ZodType<FfmpegFormatData>

export const FfmpegFormatDataParser =
  (): z.ZodType<FfmpegFormatData> => {
    if (!FfmpegFormatDataModel) {
      FfmpegFormatDataModel = z.object({
        label: z.string(),
        supportsDemuxing: z.boolean(),
        supportsMuxing: z.boolean(),
      }) as z.ZodType<FfmpegFormatData>
    }
    return FfmpegFormatDataModel!
  }

let FfmpegStrictOptionModel: z.ZodType<FfmpegStrictOption>

export const FfmpegStrictOptionParser = () => {
  if (!FfmpegStrictOptionModel) {
    FfmpegStrictOptionModel = z.enum(
      LOAD('ffmpeg_strict_option') as readonly [string, ...string[]],
    ) as z.ZodType<FfmpegStrictOption>
  }
  return FfmpegStrictOptionModel!
}

let FfmpegStrictOptionDataModel: z.ZodType<FfmpegStrictOptionData>

export const FfmpegStrictOptionDataParser =
  (): z.ZodType<FfmpegStrictOptionData> => {
    if (!FfmpegStrictOptionDataModel) {
      FfmpegStrictOptionDataModel = z.object({
        note: z.string(),
      }) as z.ZodType<FfmpegStrictOptionData>
    }
    return FfmpegStrictOptionDataModel!
  }
