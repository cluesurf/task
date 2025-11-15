import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import { CompileWastCommandInput } from '~/code/form/action/compile/code/wast/cli/index'
import {
  WastInputFormatParser,
  WastOutputFormatParser,
} from '~/code/form/action/compile/code/wast/shared/parsers'
import { LocalPathParser } from '~/code/form/object/file/parsers'

let CompileWastCommandInputModel: z.ZodType<CompileWastCommandInput>

export const CompileWastCommandInputParser =
  (): z.ZodType<CompileWastCommandInput> => {
    if (!CompileWastCommandInputModel) {
      CompileWastCommandInputModel = z.object({
        input: z.object({
          format: z.lazy(() => WastInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => WastOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<CompileWastCommandInput>
    }
    return CompileWastCommandInputModel!
  }
