import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import { ConvertMp4ToGifWithFfmpeg } from '~/code/type/action/convert/ffmpeg/index'

let ConvertMp4ToGifWithFfmpegModel: z.ZodType<ConvertMp4ToGifWithFfmpeg>

export const ConvertMp4ToGifWithFfmpegParser =
  (): z.ZodType<ConvertMp4ToGifWithFfmpeg> => {
    if (!ConvertMp4ToGifWithFfmpegModel) {
      ConvertMp4ToGifWithFfmpegModel = z.object({
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
        fps: z.number().int(),
        width: z.number().int(),
        startTime: z.union([
          z
            .number()
            .int()
            .refine(TEST('startTime', code.test_time_integer.test)),
          z
            .string()
            .refine(TEST('startTime', code.test_time_string.test)),
        ]),
        endTime: z.union([
          z
            .number()
            .int()
            .refine(TEST('endTime', code.test_time_integer.test)),
          z
            .string()
            .refine(TEST('endTime', code.test_time_string.test)),
        ]),
        duration: z.union([
          z
            .number()
            .int()
            .refine(TEST('duration', code.test_time_integer.test)),
          z
            .string()
            .refine(TEST('duration', code.test_time_string.test)),
        ]),
      }) as z.ZodType<ConvertMp4ToGifWithFfmpeg>
    }
    return ConvertMp4ToGifWithFfmpegModel!
  }
