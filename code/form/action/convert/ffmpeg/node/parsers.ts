import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  ConvertVideoWithFfmpegNodeClientInput,
  ConvertVideoWithFfmpegNodeExternalInput,
  ConvertVideoWithFfmpegNodeInput,
  ConvertVideoWithFfmpegNodeLocalExternalInput,
  ConvertVideoWithFfmpegNodeLocalInput,
  ConvertVideoWithFfmpegNodeLocalInternalInput,
  ConvertVideoWithFfmpegNodeOutput,
  ConvertVideoWithFfmpegNodeRemoteInput,
} from '~/code/form/action/convert/ffmpeg/node/index'
import {
  FfmpegCodecAudioParser,
  FfmpegCodecSubtitleParser,
  FfmpegCodecVideoParser,
  FfmpegFormatParser,
  FfmpegStrictOptionParser,
} from '~/code/form/object/ffmpeg/parsers'
import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/parsers'

let ConvertVideoWithFfmpegNodeClientInputModel: z.ZodType<ConvertVideoWithFfmpegNodeClientInput>

export const ConvertVideoWithFfmpegNodeClientInputParser =
  (): z.ZodType<ConvertVideoWithFfmpegNodeClientInput> => {
    if (!ConvertVideoWithFfmpegNodeClientInputModel) {
      ConvertVideoWithFfmpegNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => FfmpegFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
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
      }) as z.ZodType<ConvertVideoWithFfmpegNodeClientInput>
    }
    return ConvertVideoWithFfmpegNodeClientInputModel!
  }

let ConvertVideoWithFfmpegNodeExternalInputModel: z.ZodType<ConvertVideoWithFfmpegNodeExternalInput>

export const ConvertVideoWithFfmpegNodeExternalInputParser =
  (): z.ZodType<ConvertVideoWithFfmpegNodeExternalInput> => {
    if (!ConvertVideoWithFfmpegNodeExternalInputModel) {
      ConvertVideoWithFfmpegNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => FfmpegFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
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
      }) as z.ZodType<ConvertVideoWithFfmpegNodeExternalInput>
    }
    return ConvertVideoWithFfmpegNodeExternalInputModel!
  }

let ConvertVideoWithFfmpegNodeInputModel: z.ZodType<ConvertVideoWithFfmpegNodeInput>

export const ConvertVideoWithFfmpegNodeInputParser =
  (): z.ZodType<ConvertVideoWithFfmpegNodeInput> => {
    if (!ConvertVideoWithFfmpegNodeInputModel) {
      ConvertVideoWithFfmpegNodeInputModel = z.union([
        z.lazy(() => ConvertVideoWithFfmpegNodeRemoteInputParser()),
        z.lazy(() =>
          ConvertVideoWithFfmpegNodeLocalExternalInputParser(),
        ),
        z.lazy(() =>
          ConvertVideoWithFfmpegNodeLocalInternalInputParser(),
        ),
      ])
    }
    return ConvertVideoWithFfmpegNodeInputModel!
  }

let ConvertVideoWithFfmpegNodeLocalExternalInputModel: z.ZodType<ConvertVideoWithFfmpegNodeLocalExternalInput>

export const ConvertVideoWithFfmpegNodeLocalExternalInputParser =
  (): z.ZodType<ConvertVideoWithFfmpegNodeLocalExternalInput> => {
    if (!ConvertVideoWithFfmpegNodeLocalExternalInputModel) {
      ConvertVideoWithFfmpegNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => FfmpegFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => FfmpegFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
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
      }) as z.ZodType<ConvertVideoWithFfmpegNodeLocalExternalInput>
    }
    return ConvertVideoWithFfmpegNodeLocalExternalInputModel!
  }

let ConvertVideoWithFfmpegNodeLocalInputModel: z.ZodType<ConvertVideoWithFfmpegNodeLocalInput>

export const ConvertVideoWithFfmpegNodeLocalInputParser =
  (): z.ZodType<ConvertVideoWithFfmpegNodeLocalInput> => {
    if (!ConvertVideoWithFfmpegNodeLocalInputModel) {
      ConvertVideoWithFfmpegNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => FfmpegFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => FfmpegFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
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
      }) as z.ZodType<ConvertVideoWithFfmpegNodeLocalInput>
    }
    return ConvertVideoWithFfmpegNodeLocalInputModel!
  }

let ConvertVideoWithFfmpegNodeLocalInternalInputModel: z.ZodType<ConvertVideoWithFfmpegNodeLocalInternalInput>

export const ConvertVideoWithFfmpegNodeLocalInternalInputParser =
  (): z.ZodType<ConvertVideoWithFfmpegNodeLocalInternalInput> => {
    if (!ConvertVideoWithFfmpegNodeLocalInternalInputModel) {
      ConvertVideoWithFfmpegNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.lazy(() => FfmpegFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => FfmpegFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
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
      }) as z.ZodType<ConvertVideoWithFfmpegNodeLocalInternalInput>
    }
    return ConvertVideoWithFfmpegNodeLocalInternalInputModel!
  }

let ConvertVideoWithFfmpegNodeOutputModel: z.ZodType<ConvertVideoWithFfmpegNodeOutput>

export const ConvertVideoWithFfmpegNodeOutputParser =
  (): z.ZodType<ConvertVideoWithFfmpegNodeOutput> => {
    if (!ConvertVideoWithFfmpegNodeOutputModel) {
      ConvertVideoWithFfmpegNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<ConvertVideoWithFfmpegNodeOutput>
    }
    return ConvertVideoWithFfmpegNodeOutputModel!
  }

let ConvertVideoWithFfmpegNodeRemoteInputModel: z.ZodType<ConvertVideoWithFfmpegNodeRemoteInput>

export const ConvertVideoWithFfmpegNodeRemoteInputParser =
  (): z.ZodType<ConvertVideoWithFfmpegNodeRemoteInput> => {
    if (!ConvertVideoWithFfmpegNodeRemoteInputModel) {
      ConvertVideoWithFfmpegNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => FfmpegFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => FfmpegFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
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
      }) as z.ZodType<ConvertVideoWithFfmpegNodeRemoteInput>
    }
    return ConvertVideoWithFfmpegNodeRemoteInputModel!
  }
