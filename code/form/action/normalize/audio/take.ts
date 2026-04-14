import { z } from 'zod'

export const NormalizeAudioParser = z.object({
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

export type NormalizeAudioRecord = z.infer<typeof NormalizeAudioParser>
