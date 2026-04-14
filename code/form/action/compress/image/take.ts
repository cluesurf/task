import { z } from 'zod'

export const CompressImageParser = z.object({
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
  quality: z.optional(z.string()),
})

export type CompressImageRecord = z.infer<typeof CompressImageParser>
