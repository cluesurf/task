import { z } from 'zod'

export const RemovePasswordCommandInputParser = z.object({
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
  password: z.optional(z.string()),
})

export type RemovePasswordCommandInputRecord = z.infer<
  typeof RemovePasswordCommandInputParser
>
