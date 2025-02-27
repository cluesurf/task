import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import { ConvertDocumentWithLibreOfficeCommandInput } from '~/code/type/action/convert/libre-office/cli/index'
import {
  LibreOfficeInputFormatParser,
  LibreOfficeOutputFormatParser,
} from '~/code/type/object/libre-office/parsers'
import { LocalPathParser } from '~/code/type/object/file/parsers'

let ConvertDocumentWithLibreOfficeCommandInputModel: z.ZodType<ConvertDocumentWithLibreOfficeCommandInput>

export const ConvertDocumentWithLibreOfficeCommandInputParser =
  (): z.ZodType<ConvertDocumentWithLibreOfficeCommandInput> => {
    if (!ConvertDocumentWithLibreOfficeCommandInputModel) {
      ConvertDocumentWithLibreOfficeCommandInputModel = z.object({
        input: z.object({
          format: z.lazy(() => LibreOfficeInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => LibreOfficeOutputFormatParser()),
          directory: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithLibreOfficeCommandInput>
    }
    return ConvertDocumentWithLibreOfficeCommandInputModel!
  }
