import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import { CompileJava } from '~/code/type/action/compile/code/java/index'

let CompileJavaModel: z.ZodType<CompileJava>

export const CompileJavaParser = (): z.ZodType<CompileJava> => {
  if (!CompileJavaModel) {
    CompileJavaModel = z.object({
      input: z.object({
        format: z.string(),
        file: z.object({
          path: z.string(),
        }),
      }),
    }) as z.ZodType<CompileJava>
  }
  return CompileJavaModel!
}
