import { z } from 'zod'

export const ModifyPdfCommandInputParser = z.object({
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
  order: z.optional(z.string()),
  remove: z.optional(z.string()),
})

export type ModifyPdfCommandInputRecord = z.infer<
  typeof ModifyPdfCommandInputParser
>
