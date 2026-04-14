import { z } from 'zod'

export const RotateVideoParser = z.object({
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

export type RotateVideoRecord = z.infer<typeof RotateVideoParser>
