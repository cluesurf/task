import { z } from 'zod'

export const MergeParser = z.object({
  inputs: z.array(z.string()),
  output: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
})

export type MergeRecord = z.infer<typeof MergeParser>
