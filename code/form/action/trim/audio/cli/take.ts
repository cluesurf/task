import { z } from 'zod'

export const TrimAudioCommandInputParser = z.object({
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
  start: z.optional(z.string()),
  end: z.optional(z.string()),
  duration: z.optional(z.string()),
})

export type TrimAudioCommandInputRecord = z.infer<
  typeof TrimAudioCommandInputParser
>
