import { z } from 'zod'

export const HighlightParser = z.object({
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
  text: z.string(),
})

export type HighlightRecord = z.infer<typeof HighlightParser>
