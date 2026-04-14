import { z } from 'zod'

export const ShapeFontParser = z.object({
  input: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
  text: z.string(),
  features: z.optional(z.string()),
  script: z.optional(z.string()),
  language: z.optional(z.string()),
  direction: z.optional(z.string()),
})

export type ShapeFontRecord = z.infer<typeof ShapeFontParser>
