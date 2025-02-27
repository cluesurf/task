import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  AddAudioToVideoWithFfmpeg,
  CompressMp4WithFfmpeg,
  ConvertVideoToAudioWithFfmpeg,
  ConvertVideoWithFfmpegBase,
  RemoveAudioFromVideoWithFfmpeg,
} from '~/code/type/action/convert/ffmpeg/shared/index'
import {
  FfmpegCodecAudioParser,
  FfmpegCodecSubtitleParser,
  FfmpegCodecVideoParser,
  FfmpegStrictOptionParser,
} from '~/code/type/object/ffmpeg/parsers'

let AddAudioToVideoWithFfmpegModel: z.ZodType<AddAudioToVideoWithFfmpeg>

export const AddAudioToVideoWithFfmpegParser =
  (): z.ZodType<AddAudioToVideoWithFfmpeg> => {
    if (!AddAudioToVideoWithFfmpegModel) {
      AddAudioToVideoWithFfmpegModel = z.object({
        inputVideoPath: z.string(),
        inputAudioPath: z.string(),
        outputPath: z.string(),
        audioCodec: z.string(),
        fit: z.boolean(),
      }) as z.ZodType<AddAudioToVideoWithFfmpeg>
    }
    return AddAudioToVideoWithFfmpegModel!
  }

let CompressMp4WithFfmpegModel: z.ZodType<CompressMp4WithFfmpeg>

export const CompressMp4WithFfmpegParser =
  (): z.ZodType<CompressMp4WithFfmpeg> => {
    if (!CompressMp4WithFfmpegModel) {
      CompressMp4WithFfmpegModel = z.object({
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
          .optional(z.lazy(() => FfmpegCodecAudioParser()))
          .default('aac'),
        videoCodec: z
          .optional(z.lazy(() => FfmpegCodecVideoParser()))
          .default('h264'),
      }) as z.ZodType<CompressMp4WithFfmpeg>
    }
    return CompressMp4WithFfmpegModel!
  }

let ConvertVideoToAudioWithFfmpegModel: z.ZodType<ConvertVideoToAudioWithFfmpeg>

export const ConvertVideoToAudioWithFfmpegParser =
  (): z.ZodType<ConvertVideoToAudioWithFfmpeg> => {
    if (!ConvertVideoToAudioWithFfmpegModel) {
      ConvertVideoToAudioWithFfmpegModel = z.object({
        inputPath: z.string(),
        outputPath: z.string(),
      }) as z.ZodType<ConvertVideoToAudioWithFfmpeg>
    }
    return ConvertVideoToAudioWithFfmpegModel!
  }

let ConvertVideoWithFfmpegBaseModel: z.ZodType<ConvertVideoWithFfmpegBase>

export const ConvertVideoWithFfmpegBaseParser =
  (): z.ZodType<ConvertVideoWithFfmpegBase> => {
    if (!ConvertVideoWithFfmpegBaseModel) {
      ConvertVideoWithFfmpegBaseModel = z.object({
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
      }) as z.ZodType<ConvertVideoWithFfmpegBase>
    }
    return ConvertVideoWithFfmpegBaseModel!
  }

let RemoveAudioFromVideoWithFfmpegModel: z.ZodType<RemoveAudioFromVideoWithFfmpeg>

export const RemoveAudioFromVideoWithFfmpegParser =
  (): z.ZodType<RemoveAudioFromVideoWithFfmpeg> => {
    if (!RemoveAudioFromVideoWithFfmpegModel) {
      RemoveAudioFromVideoWithFfmpegModel = z.object({
        inputPath: z.string(),
        outputPath: z.string(),
      }) as z.ZodType<RemoveAudioFromVideoWithFfmpeg>
    }
    return RemoveAudioFromVideoWithFfmpegModel!
  }
