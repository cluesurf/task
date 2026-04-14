import { z } from 'zod'

export const CropPdfWithPdfCropParser = z.object({
  margin: z.optional(z.number().int().gte(0)),
  input: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
  output: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
})

export type CropPdfWithPdfCropRecord = z.infer<
  typeof CropPdfWithPdfCropParser
>
