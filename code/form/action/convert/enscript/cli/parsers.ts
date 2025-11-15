import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import { ConvertDocumentWithEnscriptCommandInput } from '~/code/form/action/convert/enscript/cli/index'
import {
  EnscriptInputFormatParser,
  EnscriptOutputFormatParser,
} from '~/code/form/object/enscript/parsers'
import { LocalPathParser } from '~/code/form/object/file/parsers'

let ConvertDocumentWithEnscriptCommandInputModel: z.ZodType<ConvertDocumentWithEnscriptCommandInput>

export const ConvertDocumentWithEnscriptCommandInputParser =
  (): z.ZodType<ConvertDocumentWithEnscriptCommandInput> => {
    if (!ConvertDocumentWithEnscriptCommandInputModel) {
      ConvertDocumentWithEnscriptCommandInputModel = z.object({
        input: z.object({
          format: z.lazy(() => EnscriptInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => EnscriptOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithEnscriptCommandInput>
    }
    return ConvertDocumentWithEnscriptCommandInputModel!
  }
