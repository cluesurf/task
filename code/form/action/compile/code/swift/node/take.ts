import { z } from 'zod'

import { SwiftInputFormatParser } from '~/code/form/action/compile/code/swift/shared/take'
import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'
import { BackendCompilationOutputParser } from '~/code/form/object/llvm/take'

export const CompileSwiftNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    format: z.lazy(() => SwiftInputFormatParser),
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => BackendCompilationOutputParser),
  }),
})

export type CompileSwiftNodeClientInputRecord = z.infer<
  typeof CompileSwiftNodeClientInputParser
>

export const CompileSwiftNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    format: z.lazy(() => SwiftInputFormatParser),
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => BackendCompilationOutputParser),
  }),
})

export type CompileSwiftNodeExternalInputRecord = z.infer<
  typeof CompileSwiftNodeExternalInputParser
>

export const CompileSwiftNodeInputParser = z.union([
  z.lazy(() => CompileSwiftNodeRemoteInputParser),
  z.lazy(() => CompileSwiftNodeLocalExternalInputParser),
  z.lazy(() => CompileSwiftNodeLocalInternalInputParser),
])

export type CompileSwiftNodeInputRecord = z.infer<
  typeof CompileSwiftNodeInputParser
>

export const CompileSwiftNodeLocalExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    format: z.lazy(() => SwiftInputFormatParser),
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => BackendCompilationOutputParser),
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type CompileSwiftNodeLocalExternalInputRecord = z.infer<
  typeof CompileSwiftNodeLocalExternalInputParser
>

export const CompileSwiftNodeLocalInputParser = z.object({
  input: z.object({
    format: z.lazy(() => SwiftInputFormatParser),
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    format: z.lazy(() => BackendCompilationOutputParser),
    file: z.lazy(() => LocalPathParser),
  }),
  pathScope: z.optional(z.string()),
})

export type CompileSwiftNodeLocalInputRecord = z.infer<
  typeof CompileSwiftNodeLocalInputParser
>

export const CompileSwiftNodeLocalInternalInputParser = z.object({
  handle: z.optional(z.literal('internal')),
  input: z.object({
    format: z.lazy(() => SwiftInputFormatParser),
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => BackendCompilationOutputParser),
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type CompileSwiftNodeLocalInternalInputRecord = z.infer<
  typeof CompileSwiftNodeLocalInternalInputParser
>

export const CompileSwiftNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type CompileSwiftNodeOutputRecord = z.infer<
  typeof CompileSwiftNodeOutputParser
>

export const CompileSwiftNodeRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    format: z.lazy(() => SwiftInputFormatParser),
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => BackendCompilationOutputParser),
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type CompileSwiftNodeRemoteInputRecord = z.infer<
  typeof CompileSwiftNodeRemoteInputParser
>
