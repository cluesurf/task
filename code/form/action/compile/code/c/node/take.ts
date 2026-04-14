import { z } from 'zod'

import { CInputFormatParser } from '~/code/form/action/compile/code/c/shared/take'
import { AssemblySyntaxParser } from '~/code/form/object/assembly/take'
import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'
import {
  BackendCompilationOutputParser,
  LlvmArchitectureParser,
  LlvmOptimizationLevelParser,
} from '~/code/form/object/llvm/take'

export const CompileCNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    format: z.lazy(() => CInputFormatParser),
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
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

export type CompileCNodeClientInputRecord = z.infer<
  typeof CompileCNodeClientInputParser
>

export const CompileCNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    format: z.lazy(() => CInputFormatParser),
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
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

export type CompileCNodeExternalInputRecord = z.infer<
  typeof CompileCNodeExternalInputParser
>

export const CompileCNodeInputParser = z.union([
  z.lazy(() => CompileCNodeRemoteInputParser),
  z.lazy(() => CompileCNodeLocalExternalInputParser),
  z.lazy(() => CompileCNodeLocalInternalInputParser),
])

export type CompileCNodeInputRecord = z.infer<
  typeof CompileCNodeInputParser
>

export const CompileCNodeLocalExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    format: z.lazy(() => CInputFormatParser),
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => BackendCompilationOutputParser),
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
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

export type CompileCNodeLocalExternalInputRecord = z.infer<
  typeof CompileCNodeLocalExternalInputParser
>

export const CompileCNodeLocalInputParser = z.object({
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

export type CompileCNodeLocalInputRecord = z.infer<
  typeof CompileCNodeLocalInputParser
>

export const CompileCNodeLocalInternalInputParser = z.object({
  handle: z.optional(z.literal('internal')),
  input: z.object({
    format: z.lazy(() => CInputFormatParser),
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => BackendCompilationOutputParser),
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
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

export type CompileCNodeLocalInternalInputRecord = z.infer<
  typeof CompileCNodeLocalInternalInputParser
>

export const CompileCNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type CompileCNodeOutputRecord = z.infer<
  typeof CompileCNodeOutputParser
>

export const CompileCNodeRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    format: z.lazy(() => CInputFormatParser),
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => BackendCompilationOutputParser),
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
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

export type CompileCNodeRemoteInputRecord = z.infer<
  typeof CompileCNodeRemoteInputParser
>
