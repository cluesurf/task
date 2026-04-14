import { TEST } from '@cluesurf/form'
import { z } from 'zod'
import * as code from '~/code/form/code'

import {
  FfmpegCodecAudioParser,
  FfmpegCodecSubtitleParser,
  FfmpegCodecVideoParser,
  FfmpegStrictOptionParser,
} from '~/code/form/object/ffmpeg/take'

export const AddAudioToVideoWithFfmpegParser = z.object({
  inputVideoPath: z.string(),
  inputAudioPath: z.string(),
  outputPath: z.string(),
  audioCodec: z.string(),
  fit: z.boolean(),
})

export type AddAudioToVideoWithFfmpegRecord = z.infer<
  typeof AddAudioToVideoWithFfmpegParser
>

export const CompressMp4WithFfmpegParser = z.object({
  input: z.object({
    format: z.string(),
    file: z.object({
      path: z.string(),
    }),
  }),
  output: z.object({
    format: z.string(),
    file: z.object({
      path: z.string(),
    }),
  }),
  audioCodec: z
    .optional(z.lazy(() => FfmpegCodecAudioParser))
    .default('aac'),
  videoCodec: z
    .optional(z.lazy(() => FfmpegCodecVideoParser))
    .default('h264'),
})

export type CompressMp4WithFfmpegRecord = z.infer<
  typeof CompressMp4WithFfmpegParser
>

export const ConvertVideoToAudioWithFfmpegParser = z.object({
  inputPath: z.string(),
  outputPath: z.string(),
})

export type ConvertVideoToAudioWithFfmpegRecord = z.infer<
  typeof ConvertVideoToAudioWithFfmpegParser
>

export const ConvertVideoWithFfmpegBaseParser = z.object({
  audioCodec: z.optional(z.lazy(() => FfmpegCodecAudioParser)),
  videoCodec: z.optional(z.lazy(() => FfmpegCodecVideoParser)),
  audioBitRate: z.optional(z.number().int()),
  videoBitRate: z.optional(z.number().int()),
  frameRate: z.optional(z.number().int()),
  fps: z.optional(z.number().int()),
  startTime: z.optional(
    z.union([
      z
        .number()
        .int()
        .refine(TEST('startTime', code.test_time_integer.test)),
      z.string().refine(TEST('startTime', code.test_time_string.test)),
    ]),
  ),
  endTime: z.optional(
    z.union([
      z
        .number()
        .int()
        .refine(TEST('endTime', code.test_time_integer.test)),
      z.string().refine(TEST('endTime', code.test_time_string.test)),
    ]),
  ),
  strict: z
    .optional(z.lazy(() => FfmpegStrictOptionParser))
    .default('strict'),
  overwrite: z.optional(z.boolean()).default(false),
  progress: z.optional(z.boolean()).default(false),
  scaleWidth: z.optional(z.number().int()),
  scaleHeight: z.optional(z.number().int()),
  audioChannels: z.optional(z.number().int()),
  audioSamplingFrequency: z.optional(z.number().int()),
  subtitleCodec: z.optional(z.lazy(() => FfmpegCodecSubtitleParser)),
  duration: z.optional(
    z.union([
      z
        .number()
        .int()
        .refine(TEST('duration', code.test_time_integer.test)),
      z.string().refine(TEST('duration', code.test_time_string.test)),
    ]),
  ),
  rotation: z.optional(z.number()),
})

export type ConvertVideoWithFfmpegBaseRecord = z.infer<
  typeof ConvertVideoWithFfmpegBaseParser
>

export const RemoveAudioFromVideoWithFfmpegParser = z.object({
  inputPath: z.string(),
  outputPath: z.string(),
})

export type RemoveAudioFromVideoWithFfmpegRecord = z.infer<
  typeof RemoveAudioFromVideoWithFfmpegParser
>
