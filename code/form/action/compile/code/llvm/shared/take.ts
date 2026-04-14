import { z } from 'zod'

export const CompileLlvmParser = z.object({
  input: z.object({
    format: z.string(),
    file: z.object({
      path: z.string(),
    }),
  }),
})

export type CompileLlvmRecord = z.infer<typeof CompileLlvmParser>
