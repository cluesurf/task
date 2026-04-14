import { z } from 'zod'

import { CInputFormatParser } from '~/code/form/action/compile/code/c/shared/take'
import { AssemblySyntaxParser } from '~/code/form/object/assembly/take'
import { LocalPathParser } from '~/code/form/object/file/take'
import {
  BackendCompilationOutputParser,
  LlvmArchitectureParser,
  LlvmOptimizationLevelParser,
} from '~/code/form/object/llvm/take'

export const CompileCCommandInputParser = z.object({
  input: z.object({
    format: z.lazy(() => CInputFormatParser),
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    format: z.lazy(() => BackendCompilationOutputParser),
    file: z.lazy(() => LocalPathParser),
    syntax: z
      .optional(z.lazy(() => AssemblySyntaxParser))
      .default('intel'),
    architecture: z
      .optional(z.lazy(() => LlvmArchitectureParser))
      .default('x86_64'),
  }),
  pathScope: z.optional(z.string()),
  optimizationLevel: z
    .optional(z.lazy(() => LlvmOptimizationLevelParser))
    .default('0'),
  fastMath: z.optional(z.boolean()).default(false),
})

export type CompileCCommandInputRecord = z.infer<
  typeof CompileCCommandInputParser
>
