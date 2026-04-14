import { z } from 'zod'

export const RenderFontParser = z.object({
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
  text: z.string(),
  fontSize: z.optional(z.number().int().gte(0)),
  features: z.optional(z.string()),
})

export type RenderFontRecord = z.infer<typeof RenderFontParser>
