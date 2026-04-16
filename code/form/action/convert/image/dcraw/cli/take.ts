import { z } from 'zod'

export const ConvertImageWithDcrawCommandInputParser = z.object({
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
  outputFormat: z.optional(z.string()),
  cameraWhiteBalance: z.optional(z.boolean()),
  srgb: z.optional(z.boolean()),
})

export type ConvertImageWithDcrawCommandInputRecord = z.infer<
  typeof ConvertImageWithDcrawCommandInputParser
>
