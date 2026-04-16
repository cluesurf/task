import { z } from 'zod'

export const RotateImageCommandInputParser = z.object({
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

export type RotateImageCommandInputRecord = z.infer<
  typeof RotateImageCommandInputParser
>
