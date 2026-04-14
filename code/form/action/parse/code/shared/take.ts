import { z } from 'zod'

export const ParseAstParser = z.object({
  input: z.object({
    format: z.string(),
    file: z.object({
      path: z.string(),
    }),
  }),
})

export type ParseAstRecord = z.infer<typeof ParseAstParser>
