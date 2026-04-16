import { z } from 'zod'

export const UpdateVideoCommandInputParser = z.object({
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
  subtitles: z.optional(z.string()),
})

export type UpdateVideoCommandInputRecord = z.infer<
  typeof UpdateVideoCommandInputParser
>
