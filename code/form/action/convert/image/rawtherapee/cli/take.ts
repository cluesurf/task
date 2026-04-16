import { z } from 'zod'

export const ConvertImageWithRawtherapeeCommandInputParser = z.object({
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
  profile: z.optional(z.string()),
  jpegQuality: z.optional(z.number().int().gte(0)),
  tiffCompression: z.optional(z.string()),
})

export type ConvertImageWithRawtherapeeCommandInputRecord = z.infer<
  typeof ConvertImageWithRawtherapeeCommandInputParser
>
