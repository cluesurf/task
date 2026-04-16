import { z } from 'zod'

export const ConvertImageWithGifsicleCommandInputParser = z.object({
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
  optimize: z.optional(z.number().int().gte(0)),
  lossy: z.optional(z.number().int().gte(0)),
  resize: z.optional(z.string()),
  colors: z.optional(z.number().int().gte(0)),
})

export type ConvertImageWithGifsicleCommandInputRecord = z.infer<
  typeof ConvertImageWithGifsicleCommandInputParser
>
