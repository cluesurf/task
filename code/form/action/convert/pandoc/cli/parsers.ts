import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import { ConvertDocumentWithPandocCommandInput } from '~/code/form/action/convert/pandoc/cli/index'
import {
  PandocInputFormatParser,
  PandocOutputFormatParser,
} from '~/code/form/object/pandoc/parsers'
import { LocalPathParser } from '~/code/form/object/file/parsers'

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
