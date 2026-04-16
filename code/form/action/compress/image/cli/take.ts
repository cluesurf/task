import { z } from 'zod'

export const CompressImageCommandInputParser = z.object({
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
  quality: z.optional(z.string()),
})

export type CompressImageCommandInputRecord = z.infer<
  typeof CompressImageCommandInputParser
>
