import { z } from 'zod'

export const UpdateFontCommandInputParser = z.object({
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
  fea: z.string(),
})

export type UpdateFontCommandInputRecord = z.infer<
  typeof UpdateFontCommandInputParser
>
