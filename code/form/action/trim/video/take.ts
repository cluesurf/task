import { z } from 'zod'

export const TrimVideoParser = z.object({
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
  reencode: z.optional(z.boolean()),
})

export type TrimVideoRecord = z.infer<typeof TrimVideoParser>
