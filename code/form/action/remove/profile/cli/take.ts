import { z } from 'zod'

export const RemoveProfileCommandInputParser = z.object({
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
})

export type RemoveProfileCommandInputRecord = z.infer<
  typeof RemoveProfileCommandInputParser
>
