import { z } from 'zod'

export const UpdateVideoParser = z.object({
  input: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
  output: z.object({
    file: z.object({
      path: z.optional(z.string()),
    }),
  }),
  subtitles: z.optional(z.string()),
})

export type UpdateVideoRecord = z.infer<typeof UpdateVideoParser>
