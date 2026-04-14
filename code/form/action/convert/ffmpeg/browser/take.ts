import { TEST } from '@cluesurf/form'
import { z } from 'zod'
import * as code from '~/code/form/code'

import {
  FfmpegCodecAudioParser,
  FfmpegCodecSubtitleParser,
  FfmpegCodecVideoParser,
  FfmpegFormatParser,
  FfmpegStrictOptionParser,
} from '~/code/form/object/ffmpeg/take'
import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const ConvertVideoWithFfmpegBrowserInputParser = z.union([
  z.lazy(() => ConvertVideoWithFfmpegBrowserRemoteInputParser),
  z.lazy(() => ConvertVideoWithFfmpegBrowserLocalInputParser),
])

export type ConvertVideoWithFfmpegBrowserInputRecord = z.infer<
  typeof ConvertVideoWithFfmpegBrowserInputParser
>

export const ConvertVideoWithFfmpegBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    format: z.lazy(() => FfmpegFormatParser),
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  output: z.object({
    format: z.lazy(() => FfmpegFormatParser),
  }),
  audioCodec: z.optional(z.lazy(() => FfmpegCodecAudioParser)),
  videoCodec: z.optional(z.lazy(() => FfmpegCodecVideoParser)),
  audioBitRate: z.optional(z.number().int()),
  videoBitRate: z.optional(z.number().int()),
  frameRate: z.optional(z.number().int()),
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

export type ConvertVideoWithFfmpegBrowserLocalInputRecord = z.infer<
  typeof ConvertVideoWithFfmpegBrowserLocalInputParser
>

export const ConvertVideoWithFfmpegBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type ConvertVideoWithFfmpegBrowserOutputRecord = z.infer<
  typeof ConvertVideoWithFfmpegBrowserOutputParser
>

export const ConvertVideoWithFfmpegBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    format: z.lazy(() => FfmpegFormatParser),
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  output: z.object({
    format: z.lazy(() => FfmpegFormatParser),
  }),
  audioCodec: z.optional(z.lazy(() => FfmpegCodecAudioParser)),
  videoCodec: z.optional(z.lazy(() => FfmpegCodecVideoParser)),
  audioBitRate: z.optional(z.number().int()),
  videoBitRate: z.optional(z.number().int()),
  frameRate: z.optional(z.number().int()),
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

export type ConvertVideoWithFfmpegBrowserRemoteInputRecord = z.infer<
  typeof ConvertVideoWithFfmpegBrowserRemoteInputParser
>
