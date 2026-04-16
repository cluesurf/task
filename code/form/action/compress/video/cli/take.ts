import { z } from 'zod'

export const CompressVideoCommandInputParser = z.object({
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
  crf: z.optional(z.string()),
  preset: z.optional(z.string()),
})

export type CompressVideoCommandInputRecord = z.infer<
  typeof CompressVideoCommandInputParser
>
