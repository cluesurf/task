import { z } from 'zod'

export const SplitAudioCommandInputParser = z.object({
  input: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
  output: z.optional(
    z.object({
      file: z.optional(
        z.object({
          path: z.optional(z.string()),
        }),
      ),
    }),
  ),
  segments: z.string(),
  silenceDb: z.optional(z.string()),
  silenceDuration: z.optional(z.string()),
})

export type SplitAudioCommandInputRecord = z.infer<
  typeof SplitAudioCommandInputParser
>
