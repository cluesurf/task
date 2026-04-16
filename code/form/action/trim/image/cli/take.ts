import { z } from 'zod'

export const TrimImageCommandInputParser = z.object({
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
  crop: z.string(),
})

export type TrimImageCommandInputRecord = z.infer<
  typeof TrimImageCommandInputParser
>
