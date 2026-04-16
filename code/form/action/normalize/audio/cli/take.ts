import { z } from 'zod'

export const NormalizeAudioCommandInputParser = z.object({
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
  target: z.optional(z.string()),
  peak: z.optional(z.string()),
  range: z.optional(z.string()),
})

export type NormalizeAudioCommandInputRecord = z.infer<
  typeof NormalizeAudioCommandInputParser
>
