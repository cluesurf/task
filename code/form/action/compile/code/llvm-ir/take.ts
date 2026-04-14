import { z } from 'zod'

import { AssemblySyntaxParser } from '~/code/form/object/assembly/take'
import { LlvmArchitectureParser } from '~/code/form/object/llvm/take'

export const CompileLlvmIrToAssemblyParser = z.object({
  input: z.object({
    format: z.string(),
    file: z.object({
      path: z.string(),
    }),
  }),
  output: z.object({
    syntax: z
      .optional(z.lazy(() => AssemblySyntaxParser))
      .default('intel'),
    architecture: z
      .optional(z.lazy(() => LlvmArchitectureParser))
      .default('x86_64'),
    file: z.object({
      path: z.string(),
    }),
  }),
})

export type CompileLlvmIrToAssemblyRecord = z.infer<
  typeof CompileLlvmIrToAssemblyParser
>
