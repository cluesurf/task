import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import { ConvertDocumentWithPandocCommandInput } from '~/code/type/action/convert/pandoc/cli/index'
import {
  PandocInputFormatParser,
  PandocOutputFormatParser,
} from '~/code/type/object/pandoc/parsers'
import { LocalPathParser } from '~/code/type/object/file/parsers'

let ConvertDocumentWithPandocCommandInputModel: z.ZodType<ConvertDocumentWithPandocCommandInput>

export const ConvertDocumentWithPandocCommandInputParser =
  (): z.ZodType<ConvertDocumentWithPandocCommandInput> => {
    if (!ConvertDocumentWithPandocCommandInputModel) {
      ConvertDocumentWithPandocCommandInputModel = z.object({
        input: z.object({
          format: z.lazy(() => PandocInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => PandocOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithPandocCommandInput>
    }
    return ConvertDocumentWithPandocCommandInputModel!
  }
