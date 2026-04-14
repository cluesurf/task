import { z } from 'zod'

import { SwiftInputFormatParser } from '~/code/form/action/compile/code/swift/shared/take'
import { LocalPathParser } from '~/code/form/object/file/take'
import { BackendCompilationOutputParser } from '~/code/form/object/llvm/take'

export const CompileSwiftCommandInputParser = z.object({
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

export type CompileSwiftCommandInputRecord = z.infer<
  typeof CompileSwiftCommandInputParser
>
