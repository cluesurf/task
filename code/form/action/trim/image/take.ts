import { z } from 'zod'

export const TrimImageParser = z.object({
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

export type TrimImageRecord = z.infer<typeof TrimImageParser>
