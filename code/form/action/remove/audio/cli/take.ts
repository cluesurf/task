import { z } from 'zod'

export const RemoveAudioCommandInputParser = z.object({
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

export type RemoveAudioCommandInputRecord = z.infer<
  typeof RemoveAudioCommandInputParser
>
