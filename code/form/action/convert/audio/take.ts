import { z } from 'zod'

export const ConvertAudioParser = z.object({
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

export type ConvertAudioRecord = z.infer<typeof ConvertAudioParser>
