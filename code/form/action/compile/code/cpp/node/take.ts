import { z } from 'zod'

import { CppInputFormatParser } from '~/code/form/action/compile/code/cpp/take'
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

export const CompileCppNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    format: z.lazy(() => CppInputFormatParser),
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
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

export type CompileCppNodeClientInputRecord = z.infer<
  typeof CompileCppNodeClientInputParser
>

export const CompileCppNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    format: z.lazy(() => CppInputFormatParser),
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
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

export type CompileCppNodeExternalInputRecord = z.infer<
  typeof CompileCppNodeExternalInputParser
>

export const CompileCppNodeInputParser = z.union([
  z.lazy(() => CompileCppNodeRemoteInputParser),
  z.lazy(() => CompileCppNodeLocalExternalInputParser),
  z.lazy(() => CompileCppNodeLocalInternalInputParser),
])

export type CompileCppNodeInputRecord = z.infer<
  typeof CompileCppNodeInputParser
>

export const CompileCppNodeLocalExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    format: z.lazy(() => CppInputFormatParser),
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => BackendCompilationOutputParser),
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
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

export type CompileCppNodeLocalExternalInputRecord = z.infer<
  typeof CompileCppNodeLocalExternalInputParser
>

export const CompileCppNodeLocalInputParser = z.object({
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

export type CompileCppNodeLocalInputRecord = z.infer<
  typeof CompileCppNodeLocalInputParser
>

export const CompileCppNodeLocalInternalInputParser = z.object({
  handle: z.optional(z.literal('internal')),
  input: z.object({
    format: z.lazy(() => CppInputFormatParser),
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => BackendCompilationOutputParser),
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
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

export type CompileCppNodeLocalInternalInputRecord = z.infer<
  typeof CompileCppNodeLocalInternalInputParser
>

export const CompileCppNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type CompileCppNodeOutputRecord = z.infer<
  typeof CompileCppNodeOutputParser
>

export const CompileCppNodeRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    format: z.lazy(() => CppInputFormatParser),
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => BackendCompilationOutputParser),
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
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

export type CompileCppNodeRemoteInputRecord = z.infer<
  typeof CompileCppNodeRemoteInputParser
>
