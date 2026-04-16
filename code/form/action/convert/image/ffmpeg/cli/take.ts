import { z } from 'zod'

export const ConvertImageWithFfmpegCommandInputParser = z.object({
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
  fps: z.optional(z.number().int().gte(0)),
  quality: z.optional(z.number().int().gte(0)),
  loop: z.optional(z.number().int().gte(0)),
  outputFormat: z.optional(z.string()),
})

export type ConvertImageWithFfmpegCommandInputRecord = z.infer<
  typeof ConvertImageWithFfmpegCommandInputParser
>
