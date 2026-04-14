import { z } from 'zod'

export const FlipImageParser = z.object({
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
  horizontal: z.optional(z.boolean()),
  vertical: z.optional(z.boolean()),
})

export type FlipImageRecord = z.infer<typeof FlipImageParser>
