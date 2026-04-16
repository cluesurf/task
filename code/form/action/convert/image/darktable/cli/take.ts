import { z } from 'zod'

export const ConvertImageWithDarktableCommandInputParser = z.object({
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
  xmp: z.optional(z.string()),
  highQuality: z.optional(z.boolean()),
  upscale: z.optional(z.boolean()),
})

export type ConvertImageWithDarktableCommandInputRecord = z.infer<
  typeof ConvertImageWithDarktableCommandInputParser
>
