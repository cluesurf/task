import { z } from 'zod'

import {
  WastInputFormatParser,
  WastOutputFormatParser,
} from '~/code/form/action/compile/code/wast/shared/take'
import { LocalPathParser } from '~/code/form/object/file/take'

export const CompileWastCommandInputParser = z.object({
  input: z.object({
    format: z.lazy(() => WastInputFormatParser),
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    format: z.lazy(() => WastOutputFormatParser),
    file: z.lazy(() => LocalPathParser),
  }),
  pathScope: z.optional(z.string()),
})

export type CompileWastCommandInputRecord = z.infer<
  typeof CompileWastCommandInputParser
>
