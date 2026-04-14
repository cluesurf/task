import { z } from 'zod'

import { CppInputFormatParser } from '~/code/form/action/compile/code/cpp/take'
import { AssemblySyntaxParser } from '~/code/form/object/assembly/take'
import { LocalPathParser } from '~/code/form/object/file/take'
import {
  BackendCompilationOutputParser,
  LlvmArchitectureParser,
  LlvmOptimizationLevelParser,
} from '~/code/form/object/llvm/take'

export const CompileCppCommandInputParser = z.object({
  input: z.object({
    format: z.lazy(() => CppInputFormatParser),
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    format: z.lazy(() => BackendCompilationOutputParser),
    file: z.lazy(() => LocalPathParser),
    architecture: z
      .optional(z.lazy(() => LlvmArchitectureParser))
      .default('x86_64'),
    syntax: z
      .optional(z.lazy(() => AssemblySyntaxParser))
      .default('intel'),
  }),
  pathScope: z.optional(z.string()),
  optimizationLevel: z
    .optional(z.lazy(() => LlvmOptimizationLevelParser))
    .default('0'),
  fastMath: z.optional(z.boolean()).default(false),
})

export type CompileCppCommandInputRecord = z.infer<
  typeof CompileCppCommandInputParser
>
