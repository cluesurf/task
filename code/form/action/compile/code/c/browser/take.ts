import { z } from 'zod'

import { CInputFormatParser } from '~/code/form/action/compile/code/c/shared/take'
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

export const CompileCBrowserInputParser = z.union([
  z.lazy(() => CompileCBrowserRemoteInputParser),
  z.lazy(() => CompileCBrowserLocalInputParser),
])

export type CompileCBrowserInputRecord = z.infer<
  typeof CompileCBrowserInputParser
>

export const CompileCBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    format: z.lazy(() => CInputFormatParser),
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  output: z.object({
    format: z.lazy(() => BackendCompilationOutputParser),
    syntax: z
      .optional(z.lazy(() => AssemblySyntaxParser))
      .default('intel'),
    architecture: z
      .optional(z.lazy(() => LlvmArchitectureParser))
      .default('x86_64'),
  }),
  optimizationLevel: z
    .optional(z.lazy(() => LlvmOptimizationLevelParser))
    .default('0'),
  fastMath: z.optional(z.boolean()).default(false),
})

export type CompileCBrowserLocalInputRecord = z.infer<
  typeof CompileCBrowserLocalInputParser
>

export const CompileCBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type CompileCBrowserOutputRecord = z.infer<
  typeof CompileCBrowserOutputParser
>

export const CompileCBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    format: z.lazy(() => CInputFormatParser),
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  output: z.object({
    format: z.lazy(() => BackendCompilationOutputParser),
    syntax: z
      .optional(z.lazy(() => AssemblySyntaxParser))
      .default('intel'),
    architecture: z
      .optional(z.lazy(() => LlvmArchitectureParser))
      .default('x86_64'),
  }),
  optimizationLevel: z
    .optional(z.lazy(() => LlvmOptimizationLevelParser))
    .default('0'),
  fastMath: z.optional(z.boolean()).default(false),
})

export type CompileCBrowserRemoteInputRecord = z.infer<
  typeof CompileCBrowserRemoteInputParser
>
