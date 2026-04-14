import { z } from 'zod'

export const CompileJavaParser = z.object({
  input: z.object({
    format: z.string(),
    file: z.object({
      path: z.string(),
    }),
  }),
})

export type CompileJavaRecord = z.infer<typeof CompileJavaParser>
