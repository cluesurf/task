import { z } from 'zod'

export const ResizeVideoParser = z.object({
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
  width: z.optional(z.number().int().gte(0)),
  height: z.optional(z.number().int().gte(0)),
})

export type ResizeVideoRecord = z.infer<typeof ResizeVideoParser>
