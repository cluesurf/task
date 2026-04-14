import { z } from 'zod'

export const DumpFontParser = z.object({
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
  tables: z.optional(z.string()),
})

export type DumpFontRecord = z.infer<typeof DumpFontParser>
