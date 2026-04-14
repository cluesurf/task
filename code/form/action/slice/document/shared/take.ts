import { z } from 'zod'

export const SlicePdfParser = z.object({
  input: z.object({
    format: z.string(),
    file: z.object({
      path: z.string(),
    }),
  }),
  startPage: z.number().int().gte(0),
  endPage: z.number().int().gte(0),
  output: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
})

export type SlicePdfRecord = z.infer<typeof SlicePdfParser>

export const SlicePdfWithDataParser = z.object({
  input: z.object({
    format: z.string(),
    file: z.object({
      data: z.instanceof(ArrayBuffer),
    }),
  }),
  startPage: z.number().int().gte(0),
  endPage: z.number().int().gte(0),
})

export type SlicePdfWithDataRecord = z.infer<
  typeof SlicePdfWithDataParser
>
