import { z } from 'zod'

export const ConvertImageWithImg2WebpCommandInputParser = z.object({
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
  quality: z.optional(z.number().int().gte(0)),
  lossless: z.optional(z.boolean()),
  delay: z.optional(z.number().int().gte(0)),
  loop: z.optional(z.number().int().gte(0)),
})

export type ConvertImageWithImg2WebpCommandInputRecord = z.infer<
  typeof ConvertImageWithImg2WebpCommandInputParser
>
