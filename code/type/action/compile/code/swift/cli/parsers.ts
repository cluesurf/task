import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import { CompileSwiftCommandInput } from '~/code/type/action/compile/code/swift/cli/index'
import { SwiftInputFormatParser } from '~/code/type/action/compile/code/swift/shared/parsers'
import { LocalPathParser } from '~/code/type/object/file/parsers'
import { BackendCompilationOutputParser } from '~/code/type/object/llvm/parsers'

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
