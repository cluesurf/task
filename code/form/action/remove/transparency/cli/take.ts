import { z } from 'zod'

export const RemoveTransparencyCommandInputParser = z.object({
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
  background: z.optional(z.string()).default('white'),
})

export type RemoveTransparencyCommandInputRecord = z.infer<
  typeof RemoveTransparencyCommandInputParser
>
