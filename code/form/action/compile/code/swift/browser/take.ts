import { z } from 'zod'

import { SwiftInputFormatParser } from '~/code/form/action/compile/code/swift/shared/take'
import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'
import { BackendCompilationOutputParser } from '~/code/form/object/llvm/take'

export const CompileSwiftBrowserInputParser = z.union([
  z.lazy(() => CompileSwiftBrowserRemoteInputParser),
  z.lazy(() => CompileSwiftBrowserLocalInputParser),
])

export type CompileSwiftBrowserInputRecord = z.infer<
  typeof CompileSwiftBrowserInputParser
>

export const CompileSwiftBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    format: z.lazy(() => SwiftInputFormatParser),
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  output: z.object({
    format: z.lazy(() => BackendCompilationOutputParser),
  }),
})

export type CompileSwiftBrowserLocalInputRecord = z.infer<
  typeof CompileSwiftBrowserLocalInputParser
>

export const CompileSwiftBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type CompileSwiftBrowserOutputRecord = z.infer<
  typeof CompileSwiftBrowserOutputParser
>

export const CompileSwiftBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    format: z.lazy(() => SwiftInputFormatParser),
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  output: z.object({
    format: z.lazy(() => BackendCompilationOutputParser),
  }),
})

export type CompileSwiftBrowserRemoteInputRecord = z.infer<
  typeof CompileSwiftBrowserRemoteInputParser
>
