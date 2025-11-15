import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import { ConvertDocumentWithLibreOfficeCommandInput } from '~/code/form/action/convert/libre-office/cli/index'
import {
  LibreOfficeInputFormatParser,
  LibreOfficeOutputFormatParser,
} from '~/code/form/object/libre-office/parsers'
import { LocalPathParser } from '~/code/form/object/file/parsers'

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
