import { z } from 'zod'

export const ConvertImageWithAutotraceCommandInputParser = z.object({
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
  outputFormat: z.optional(z.string()),
  colors: z.optional(z.number().int().gte(0)),
  despeckleLevel: z.optional(z.number().int().gte(0)),
})

export type ConvertImageWithAutotraceCommandInputRecord = z.infer<
  typeof ConvertImageWithAutotraceCommandInputParser
>
