import { z } from 'zod'

export const RotateImageParser = z.object({
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

export type RotateImageRecord = z.infer<typeof RotateImageParser>
