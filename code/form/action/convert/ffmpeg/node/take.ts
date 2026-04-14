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
  FileInputPathParser,
  FilePathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const ConvertVideoWithFfmpegNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    format: z.lazy(() => FfmpegFormatParser),
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
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

export type ConvertVideoWithFfmpegNodeClientInputRecord = z.infer<
  typeof ConvertVideoWithFfmpegNodeClientInputParser
>

export const ConvertVideoWithFfmpegNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    format: z.lazy(() => FfmpegFormatParser),
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
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

export type ConvertVideoWithFfmpegNodeExternalInputRecord = z.infer<
  typeof ConvertVideoWithFfmpegNodeExternalInputParser
>

export const ConvertVideoWithFfmpegNodeInputParser = z.union([
  z.lazy(() => ConvertVideoWithFfmpegNodeRemoteInputParser),
  z.lazy(() => ConvertVideoWithFfmpegNodeLocalExternalInputParser),
  z.lazy(() => ConvertVideoWithFfmpegNodeLocalInternalInputParser),
])

export type ConvertVideoWithFfmpegNodeInputRecord = z.infer<
  typeof ConvertVideoWithFfmpegNodeInputParser
>

export const ConvertVideoWithFfmpegNodeLocalExternalInputParser =
  z.object({
    handle: z.literal('external'),
    input: z.object({
      format: z.string(),
      file: z.union([
        z.lazy(() => FilePathParser),
        z.lazy(() => FileContentParser),
      ]),
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
    startTime: z.optional(
      z.union([
        z
          .number()
          .int()
          .refine(TEST('startTime', code.test_time_integer.test)),
        z
          .string()
          .refine(TEST('startTime', code.test_time_string.test)),
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

export type ConvertVideoWithFfmpegNodeLocalExternalInputRecord =
  z.infer<typeof ConvertVideoWithFfmpegNodeLocalExternalInputParser>

export const ConvertVideoWithFfmpegNodeLocalInputParser = z.object({
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

export type ConvertVideoWithFfmpegNodeLocalInputRecord = z.infer<
  typeof ConvertVideoWithFfmpegNodeLocalInputParser
>

export const ConvertVideoWithFfmpegNodeLocalInternalInputParser =
  z.object({
    handle: z.optional(z.literal('internal')),
    input: z.object({
      format: z.string(),
      file: z.union([
        z.lazy(() => FilePathParser),
        z.lazy(() => FileContentParser),
      ]),
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
    startTime: z.optional(
      z.union([
        z
          .number()
          .int()
          .refine(TEST('startTime', code.test_time_integer.test)),
        z
          .string()
          .refine(TEST('startTime', code.test_time_string.test)),
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

export type ConvertVideoWithFfmpegNodeLocalInternalInputRecord =
  z.infer<typeof ConvertVideoWithFfmpegNodeLocalInternalInputParser>

export const ConvertVideoWithFfmpegNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type ConvertVideoWithFfmpegNodeOutputRecord = z.infer<
  typeof ConvertVideoWithFfmpegNodeOutputParser
>

export const ConvertVideoWithFfmpegNodeRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    format: z.string(),
    file: z.union([
      z.lazy(() => FilePathParser),
      z.lazy(() => FileContentParser),
    ]),
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

export type ConvertVideoWithFfmpegNodeRemoteInputRecord = z.infer<
  typeof ConvertVideoWithFfmpegNodeRemoteInputParser
>
