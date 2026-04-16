import { z } from 'zod'

export const ConvertImageWithApngasmCommandInputParser = z.object({
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
  delay: z.optional(z.number().int().gte(0)),
  skipDuplicates: z.optional(z.boolean()),
})

export type ConvertImageWithApngasmCommandInputRecord = z.infer<
  typeof ConvertImageWithApngasmCommandInputParser
>
