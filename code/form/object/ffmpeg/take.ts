import { z } from 'zod'

import {
  FfmpegCodecAudio,
  FfmpegCodecContentKey,
  FfmpegCodecSubtitle,
  FfmpegCodecVideo,
  FfmpegDecoderAudio,
  FfmpegDecoderContentKey,
  FfmpegDecoderSubtitle,
  FfmpegDecoderVideo,
  FfmpegEncoderAudio,
  FfmpegEncoderContentKey,
  FfmpegEncoderSubtitle,
  FfmpegEncoderVideo,
  FfmpegFormat,
  FfmpegFormatContentKey,
  FfmpegStrictOption,
} from '~/code/form/object/ffmpeg'
import {
  FFMPEG_CODEC_AUDIO,
  FFMPEG_CODEC_CONTENT_KEY,
  FFMPEG_CODEC_SUBTITLE,
  FFMPEG_CODEC_VIDEO,
  FFMPEG_DECODER_AUDIO,
  FFMPEG_DECODER_CONTENT_KEY,
  FFMPEG_DECODER_SUBTITLE,
  FFMPEG_DECODER_VIDEO,
  FFMPEG_ENCODER_AUDIO,
  FFMPEG_ENCODER_CONTENT_KEY,
  FFMPEG_ENCODER_SUBTITLE,
  FFMPEG_ENCODER_VIDEO,
  FFMPEG_FORMAT,
  FFMPEG_FORMAT_CONTENT_KEY,
  FFMPEG_STRICT_OPTION,
} from '~/code/form/object/ffmpeg/base'

export const FfmpegCodecAudioParser = z.enum(
  FFMPEG_CODEC_AUDIO as readonly [string, ...string[]],
) as z.ZodType<FfmpegCodecAudio>

export const FfmpegCodecContentKeyParser: z.ZodType<FfmpegCodecContentKey> =
  z.enum(
    FFMPEG_CODEC_CONTENT_KEY as [
      FfmpegCodecContentKey,
      ...FfmpegCodecContentKey[],
    ],
  )

export const FfmpegCodecDataParser = z.object({
  label: z.string(),
  type: z.optional(z.string()),
  supportsDecoding: z.boolean(),
  supportsEncoding: z.boolean(),
  intraFrameOnly: z.boolean(),
  lossy: z.boolean(),
  lossless: z.boolean(),
})

export type FfmpegCodecDataRecord = z.infer<
  typeof FfmpegCodecDataParser
>

export const FfmpegCodecSubtitleParser = z.enum(
  FFMPEG_CODEC_SUBTITLE as readonly [string, ...string[]],
) as z.ZodType<FfmpegCodecSubtitle>

export const FfmpegCodecVideoParser = z.enum(
  FFMPEG_CODEC_VIDEO as readonly [string, ...string[]],
) as z.ZodType<FfmpegCodecVideo>

export const FfmpegDecoderAudioParser = z.enum(
  FFMPEG_DECODER_AUDIO as readonly [string, ...string[]],
) as z.ZodType<FfmpegDecoderAudio>

export const FfmpegDecoderContentKeyParser: z.ZodType<FfmpegDecoderContentKey> =
  z.enum(
    FFMPEG_DECODER_CONTENT_KEY as [
      FfmpegDecoderContentKey,
      ...FfmpegDecoderContentKey[],
    ],
  )

export const FfmpegDecoderDataParser = z.object({
  label: z.string(),
  type: z.string(),
  frameLevelMultithreading: z.boolean(),
  sliceLevelMultithreading: z.boolean(),
  experimental: z.boolean(),
  supportsDrawHorizontalBand: z.boolean(),
  supportsDirectRenderingMethod1: z.boolean(),
})

export type FfmpegDecoderDataRecord = z.infer<
  typeof FfmpegDecoderDataParser
>

export const FfmpegDecoderSubtitleParser = z.enum(
  FFMPEG_DECODER_SUBTITLE as readonly [string, ...string[]],
) as z.ZodType<FfmpegDecoderSubtitle>

export const FfmpegDecoderVideoParser = z.enum(
  FFMPEG_DECODER_VIDEO as readonly [string, ...string[]],
) as z.ZodType<FfmpegDecoderVideo>

export const FfmpegEncoderAudioParser = z.enum(
  FFMPEG_ENCODER_AUDIO as readonly [string, ...string[]],
) as z.ZodType<FfmpegEncoderAudio>

export const FfmpegEncoderContentKeyParser: z.ZodType<FfmpegEncoderContentKey> =
  z.enum(
    FFMPEG_ENCODER_CONTENT_KEY as [
      FfmpegEncoderContentKey,
      ...FfmpegEncoderContentKey[],
    ],
  )

export const FfmpegEncoderDataParser = z.object({
  label: z.string(),
  type: z.string(),
  frameLevelMultithreading: z.boolean(),
  sliceLevelMultithreading: z.boolean(),
  experimental: z.boolean(),
  supportsDrawHorizontalBand: z.boolean(),
  supportsDirectRenderingMethod1: z.boolean(),
})

export type FfmpegEncoderDataRecord = z.infer<
  typeof FfmpegEncoderDataParser
>

export const FfmpegEncoderSubtitleParser = z.enum(
  FFMPEG_ENCODER_SUBTITLE as readonly [string, ...string[]],
) as z.ZodType<FfmpegEncoderSubtitle>

export const FfmpegEncoderVideoParser = z.enum(
  FFMPEG_ENCODER_VIDEO as readonly [string, ...string[]],
) as z.ZodType<FfmpegEncoderVideo>

export const FfmpegFormatParser = z.enum(
  FFMPEG_FORMAT as readonly [string, ...string[]],
) as z.ZodType<FfmpegFormat>

export const FfmpegFormatContentKeyParser: z.ZodType<FfmpegFormatContentKey> =
  z.enum(
    FFMPEG_FORMAT_CONTENT_KEY as [
      FfmpegFormatContentKey,
      ...FfmpegFormatContentKey[],
    ],
  )

export const FfmpegFormatDataParser = z.object({
  label: z.string(),
  supportsDemuxing: z.boolean(),
  supportsMuxing: z.boolean(),
})

export type FfmpegFormatDataRecord = z.infer<
  typeof FfmpegFormatDataParser
>

export const FfmpegStrictOptionParser = z.enum(
  FFMPEG_STRICT_OPTION as readonly [string, ...string[]],
) as z.ZodType<FfmpegStrictOption>

export const FfmpegStrictOptionDataParser = z.object({
  note: z.string(),
})

export type FfmpegStrictOptionDataRecord = z.infer<
  typeof FfmpegStrictOptionDataParser
>
