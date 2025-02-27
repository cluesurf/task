import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  ConvertVideoWithFfmpegBrowserInput,
  ConvertVideoWithFfmpegBrowserLocalInput,
  ConvertVideoWithFfmpegBrowserOutput,
  ConvertVideoWithFfmpegBrowserRemoteInput,
} from '~/code/type/action/convert/ffmpeg/browser/index'
import {
  FfmpegCodecAudioParser,
  FfmpegCodecSubtitleParser,
  FfmpegCodecVideoParser,
  FfmpegFormatParser,
  FfmpegStrictOptionParser,
} from '~/code/type/object/ffmpeg/parsers'
import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/type/object/file/parsers'

let ConvertVideoWithFfmpegBrowserInputModel: z.ZodType<ConvertVideoWithFfmpegBrowserInput>

export const ConvertVideoWithFfmpegBrowserInputParser =
  (): z.ZodType<ConvertVideoWithFfmpegBrowserInput> => {
    if (!ConvertVideoWithFfmpegBrowserInputModel) {
      ConvertVideoWithFfmpegBrowserInputModel = z.union([
        z.lazy(() => ConvertVideoWithFfmpegBrowserRemoteInputParser()),
        z.lazy(() => ConvertVideoWithFfmpegBrowserLocalInputParser()),
      ])
    }
    return ConvertVideoWithFfmpegBrowserInputModel!
  }

let ConvertVideoWithFfmpegBrowserLocalInputModel: z.ZodType<ConvertVideoWithFfmpegBrowserLocalInput>

export const ConvertVideoWithFfmpegBrowserLocalInputParser =
  (): z.ZodType<ConvertVideoWithFfmpegBrowserLocalInput> => {
    if (!ConvertVideoWithFfmpegBrowserLocalInputModel) {
      ConvertVideoWithFfmpegBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => FfmpegFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => FfmpegFormatParser()),
        }),
        audioCodec: z.optional(z.lazy(() => FfmpegCodecAudioParser())),
        videoCodec: z.optional(z.lazy(() => FfmpegCodecVideoParser())),
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
            z
              .string()
              .refine(TEST('endTime', code.test_time_string.test)),
          ]),
        ),
        strict: z
          .optional(z.lazy(() => FfmpegStrictOptionParser()))
          .default('strict'),
        overwrite: z.optional(z.boolean()).default(false),
        progress: z.optional(z.boolean()).default(false),
        scaleWidth: z.optional(z.number().int()),
        scaleHeight: z.optional(z.number().int()),
        audioChannels: z.optional(z.number().int()),
        audioSamplingFrequency: z.optional(z.number().int()),
        subtitleCodec: z.optional(
          z.lazy(() => FfmpegCodecSubtitleParser()),
        ),
        duration: z.optional(
          z.union([
            z
              .number()
              .int()
              .refine(TEST('duration', code.test_time_integer.test)),
            z
              .string()
              .refine(TEST('duration', code.test_time_string.test)),
          ]),
        ),
        rotation: z.optional(z.number()),
      }) as z.ZodType<ConvertVideoWithFfmpegBrowserLocalInput>
    }
    return ConvertVideoWithFfmpegBrowserLocalInputModel!
  }

let ConvertVideoWithFfmpegBrowserOutputModel: z.ZodType<ConvertVideoWithFfmpegBrowserOutput>

export const ConvertVideoWithFfmpegBrowserOutputParser =
  (): z.ZodType<ConvertVideoWithFfmpegBrowserOutput> => {
    if (!ConvertVideoWithFfmpegBrowserOutputModel) {
      ConvertVideoWithFfmpegBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<ConvertVideoWithFfmpegBrowserOutput>
    }
    return ConvertVideoWithFfmpegBrowserOutputModel!
  }

let ConvertVideoWithFfmpegBrowserRemoteInputModel: z.ZodType<ConvertVideoWithFfmpegBrowserRemoteInput>

export const ConvertVideoWithFfmpegBrowserRemoteInputParser =
  (): z.ZodType<ConvertVideoWithFfmpegBrowserRemoteInput> => {
    if (!ConvertVideoWithFfmpegBrowserRemoteInputModel) {
      ConvertVideoWithFfmpegBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => FfmpegFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => FfmpegFormatParser()),
        }),
        audioCodec: z.optional(z.lazy(() => FfmpegCodecAudioParser())),
        videoCodec: z.optional(z.lazy(() => FfmpegCodecVideoParser())),
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
            z
              .string()
              .refine(TEST('endTime', code.test_time_string.test)),
          ]),
        ),
        strict: z
          .optional(z.lazy(() => FfmpegStrictOptionParser()))
          .default('strict'),
        overwrite: z.optional(z.boolean()).default(false),
        progress: z.optional(z.boolean()).default(false),
        scaleWidth: z.optional(z.number().int()),
        scaleHeight: z.optional(z.number().int()),
        audioChannels: z.optional(z.number().int()),
        audioSamplingFrequency: z.optional(z.number().int()),
        subtitleCodec: z.optional(
          z.lazy(() => FfmpegCodecSubtitleParser()),
        ),
        duration: z.optional(
          z.union([
            z
              .number()
              .int()
              .refine(TEST('duration', code.test_time_integer.test)),
            z
              .string()
              .refine(TEST('duration', code.test_time_string.test)),
          ]),
        ),
        rotation: z.optional(z.number()),
      }) as z.ZodType<ConvertVideoWithFfmpegBrowserRemoteInput>
    }
    return ConvertVideoWithFfmpegBrowserRemoteInputModel!
  }
