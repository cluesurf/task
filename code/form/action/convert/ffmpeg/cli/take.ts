import { TEST } from '@cluesurf/form'
import { z } from 'zod'
import * as code from '~/code/form/code'

import {
  FfmpegCodecAudioParser,
  FfmpegCodecSubtitleParser,
  FfmpegCodecVideoParser,
  FfmpegStrictOptionParser,
} from '~/code/form/object/ffmpeg/take'
import { LocalPathParser } from '~/code/form/object/file/take'

export const ConvertVideoWithFfmpegCommandInputParser = z.object({
  input: z.object({
    format: z.string(),
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    format: z.string(),
    file: z.optional(z.lazy(() => LocalPathParser)),
  }),
  pathScope: z.optional(z.string()),
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

export type ConvertVideoWithFfmpegCommandInputRecord = z.infer<
  typeof ConvertVideoWithFfmpegCommandInputParser
>
