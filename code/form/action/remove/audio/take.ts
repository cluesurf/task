import { z } from 'zod'

export const RemoveAudioParser = z.object({
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
})

export type RemoveAudioRecord = z.infer<typeof RemoveAudioParser>
