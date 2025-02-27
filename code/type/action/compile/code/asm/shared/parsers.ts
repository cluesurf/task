import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import { CompileAsm } from '~/code/type/action/compile/code/asm/shared/index'

let CompileAsmModel: z.ZodType<CompileAsm>

export const CompileAsmParser = (): z.ZodType<CompileAsm> => {
  if (!CompileAsmModel) {
    CompileAsmModel = z.object({
      input: z.object({
        format: z.string(),
        file: z.object({
          path: z.string(),
        }),
      }),
    }) as z.ZodType<CompileAsm>
  }
  return CompileAsmModel!
}
