import { z } from 'zod'

export const ShapeFontCommandInputParser = z.object({
  input: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
  output: z.optional(
    z.object({
      file: z.optional(
        z.object({
          path: z.optional(z.string()),
        }),
      ),
    }),
  ),
  text: z.string(),
  features: z.optional(z.string()),
  script: z.optional(z.string()),
  language: z.optional(z.string()),
  direction: z.optional(z.string()),
})

export type ShapeFontCommandInputRecord = z.infer<
  typeof ShapeFontCommandInputParser
>
