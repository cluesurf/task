import { z } from 'zod'

export const CompressAudioParser = z.object({
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
  bitrate: z.optional(z.string()),
})

export type CompressAudioRecord = z.infer<typeof CompressAudioParser>
