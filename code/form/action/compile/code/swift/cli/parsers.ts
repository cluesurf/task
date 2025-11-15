import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import { CompileSwiftCommandInput } from '~/code/form/action/compile/code/swift/cli/index'
import { SwiftInputFormatParser } from '~/code/form/action/compile/code/swift/shared/parsers'
import { LocalPathParser } from '~/code/form/object/file/parsers'
import { BackendCompilationOutputParser } from '~/code/form/object/llvm/parsers'

let CompileSwiftCommandInputModel: z.ZodType<CompileSwiftCommandInput>

export const CompileSwiftCommandInputParser =
  (): z.ZodType<CompileSwiftCommandInput> => {
    if (!CompileSwiftCommandInputModel) {
      CompileSwiftCommandInputModel = z.object({
        input: z.object({
          format: z.lazy(() => SwiftInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<CompileSwiftCommandInput>
    }
    return CompileSwiftCommandInputModel!
  }
