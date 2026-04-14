import { z } from 'zod'

export const ExtractFontParser = z.object({
  input: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
  output: z.object({
    file: z.object({
      path: z.optional(z.string()),
    }),
  }),
  as: z.optional(z.string()),
})

export type ExtractFontRecord = z.infer<typeof ExtractFontParser>
