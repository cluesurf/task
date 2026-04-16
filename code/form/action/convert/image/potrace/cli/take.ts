import { z } from 'zod'

export const ConvertImageWithPotraceCommandInputParser = z.object({
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
  threshold: z.optional(z.number()),
  turdsize: z.optional(z.number().int().gte(0)),
})

export type ConvertImageWithPotraceCommandInputRecord = z.infer<
  typeof ConvertImageWithPotraceCommandInputParser
>
