import { z } from 'zod'

export const SplitParser = z.object({
  input: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
  output: z.optional(
    z.object({
      file: z.object({
        path: z.optional(z.string()),
      }),
    }),
  ),
  pages: z.string(),
})

export type SplitRecord = z.infer<typeof SplitParser>
