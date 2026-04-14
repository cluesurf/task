import { z } from 'zod'

export const CompileAsmParser = z.object({
  input: z.object({
    format: z.string(),
    file: z.object({
      path: z.string(),
    }),
  }),
})

export type CompileAsmRecord = z.infer<typeof CompileAsmParser>
