import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import { AssemblySyntax } from '~/code/type/object/assembly/index'

let AssemblySyntaxModel: z.ZodType<AssemblySyntax>

export const AssemblySyntaxParser = () => {
  if (!AssemblySyntaxModel) {
    AssemblySyntaxModel = z.enum(
      LOAD('assembly_syntax') as readonly [string, ...string[]],
    ) as z.ZodType<AssemblySyntax>
  }
  return AssemblySyntaxModel!
}
