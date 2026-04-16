import { z } from 'zod'

export const ConvertImageWithRsvgCommandInputParser = z.object({
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
  width: z.optional(z.number().int().gte(0)),
  height: z.optional(z.number().int().gte(0)),
  dpi: z.optional(z.number().int().gte(0)),
  background: z.optional(z.string()),
})

export type ConvertImageWithRsvgCommandInputRecord = z.infer<
  typeof ConvertImageWithRsvgCommandInputParser
>
