import { TEST } from '@cluesurf/form'
import { z } from 'zod'
import * as code from '~/code/form/code'

export const ConvertMp4ToGifWithFfmpegParser = z.object({
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
    z.string().refine(TEST('startTime', code.test_time_string.test)),
  ]),
  endTime: z.union([
    z
      .number()
      .int()
      .refine(TEST('endTime', code.test_time_integer.test)),
    z.string().refine(TEST('endTime', code.test_time_string.test)),
  ]),
  duration: z.union([
    z
      .number()
      .int()
      .refine(TEST('duration', code.test_time_integer.test)),
    z.string().refine(TEST('duration', code.test_time_string.test)),
  ]),
})

export type ConvertMp4ToGifWithFfmpegRecord = z.infer<
  typeof ConvertMp4ToGifWithFfmpegParser
>
