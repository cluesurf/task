import { z } from 'zod'

export const SubsetFontParser = z.object({
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
  text: z.optional(z.string()),
  unicodes: z.optional(z.string()),
  layoutFeatures: z.optional(z.string()),
  flavor: z.optional(z.string()),
})

export type SubsetFontRecord = z.infer<typeof SubsetFontParser>
