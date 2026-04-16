import { z } from 'zod'

export const FlipImageCommandInputParser = z.object({
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

export type FlipImageCommandInputRecord = z.infer<
  typeof FlipImageCommandInputParser
>
