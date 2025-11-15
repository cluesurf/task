import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import { CompileLlvm } from '~/code/form/action/compile/code/llvm/shared/index'

let CompileLlvmModel: z.ZodType<CompileLlvm>

export const CompileLlvmParser = (): z.ZodType<CompileLlvm> => {
  if (!CompileLlvmModel) {
    CompileLlvmModel = z.object({
      input: z.object({
        format: z.string(),
        file: z.object({
          path: z.string(),
        }),
      }),
    }) as z.ZodType<CompileLlvm>
  }
  return CompileLlvmModel!
}
