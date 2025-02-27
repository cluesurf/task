import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import { ConvertDocumentWithEnscriptCommandInput } from '~/code/type/action/convert/enscript/cli/index'
import {
  EnscriptInputFormatParser,
  EnscriptOutputFormatParser,
} from '~/code/type/object/enscript/parsers'
import { LocalPathParser } from '~/code/type/object/file/parsers'

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
