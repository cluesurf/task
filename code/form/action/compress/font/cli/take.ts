import { z } from 'zod'

export const CompressFontCommandInputParser = z.object({
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
})

export type CompressFontCommandInputRecord = z.infer<
  typeof CompressFontCommandInputParser
>
