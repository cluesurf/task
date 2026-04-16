import { z } from 'zod'

export const RotateVideoCommandInputParser = z.object({
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
  degree: z.string(),
})

export type RotateVideoCommandInputRecord = z.infer<
  typeof RotateVideoCommandInputParser
>
