import { z } from 'zod'

import { CppInputFormatParser } from '~/code/form/action/compile/code/cpp/take'
import { AssemblySyntaxParser } from '~/code/form/object/assembly/take'
import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'
import {
  BackendCompilationOutputParser,
  LlvmArchitectureParser,
  LlvmOptimizationLevelParser,
} from '~/code/form/object/llvm/take'

export const CompileCppBrowserInputParser = z.union([
  z.lazy(() => CompileCppBrowserRemoteInputParser),
  z.lazy(() => CompileCppBrowserLocalInputParser),
])

export type CompileCppBrowserInputRecord = z.infer<
  typeof CompileCppBrowserInputParser
>

export const CompileCppBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    format: z.lazy(() => CppInputFormatParser),
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  output: z.object({
    format: z.lazy(() => BackendCompilationOutputParser),
    architecture: z
      .optional(z.lazy(() => LlvmArchitectureParser))
      .default('x86_64'),
    syntax: z
      .optional(z.lazy(() => AssemblySyntaxParser))
      .default('intel'),
  }),
  optimizationLevel: z
    .optional(z.lazy(() => LlvmOptimizationLevelParser))
    .default('0'),
  fastMath: z.optional(z.boolean()).default(false),
})

export type CompileCppBrowserLocalInputRecord = z.infer<
  typeof CompileCppBrowserLocalInputParser
>

export const CompileCppBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type CompileCppBrowserOutputRecord = z.infer<
  typeof CompileCppBrowserOutputParser
>

export const CompileCppBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    format: z.lazy(() => CppInputFormatParser),
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  output: z.object({
    format: z.lazy(() => BackendCompilationOutputParser),
    architecture: z
      .optional(z.lazy(() => LlvmArchitectureParser))
      .default('x86_64'),
    syntax: z
      .optional(z.lazy(() => AssemblySyntaxParser))
      .default('intel'),
  }),
  optimizationLevel: z
    .optional(z.lazy(() => LlvmOptimizationLevelParser))
    .default('0'),
  fastMath: z.optional(z.boolean()).default(false),
})

export type CompileCppBrowserRemoteInputRecord = z.infer<
  typeof CompileCppBrowserRemoteInputParser
>
