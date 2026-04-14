import { z } from 'zod'

export const CompressFontParser = z.object({
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
})

export type CompressFontRecord = z.infer<typeof CompressFontParser>
