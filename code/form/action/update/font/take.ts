import { z } from 'zod'

export const UpdateFontParser = z.object({
  input: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
  output: z.object({
    file: z.object({
      path: z.optional(z.string()),
    }),
  }),
  fea: z.string(),
})

export type UpdateFontRecord = z.infer<typeof UpdateFontParser>
