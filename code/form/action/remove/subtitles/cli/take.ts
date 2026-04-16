import { z } from 'zod'

export const RemoveSubtitlesCommandInputParser = z.object({
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

export type RemoveSubtitlesCommandInputRecord = z.infer<
  typeof RemoveSubtitlesCommandInputParser
>
