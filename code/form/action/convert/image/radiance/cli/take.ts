import { z } from 'zod'

export const ConvertImageWithRadianceCommandInputParser = z.object({
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
  reverse: z.optional(z.boolean()),
})

export type ConvertImageWithRadianceCommandInputRecord = z.infer<
  typeof ConvertImageWithRadianceCommandInputParser
>
