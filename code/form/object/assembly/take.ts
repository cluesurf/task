import { z } from 'zod'

import { AssemblySyntax } from '~/code/form/object/assembly'
import { ASSEMBLY_SYNTAX } from '~/code/form/object/assembly/base'

export const AssemblySyntaxParser = z.enum(
  ASSEMBLY_SYNTAX as readonly [string, ...string[]],
) as z.ZodType<AssemblySyntax>
