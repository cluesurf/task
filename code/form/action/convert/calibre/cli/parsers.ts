import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import { ConvertDocumentWithCalibreCommandInput } from '~/code/form/action/convert/calibre/cli/index'
import {
  CalibreInputFormatParser,
  CalibreOutputFormatParser,
} from '~/code/form/object/calibre/parsers'
import { LocalPathParser } from '~/code/form/object/file/parsers'

let ConvertDocumentWithCalibreCommandInputModel: z.ZodType<ConvertDocumentWithCalibreCommandInput>

export const ConvertDocumentWithCalibreCommandInputParser =
  (): z.ZodType<ConvertDocumentWithCalibreCommandInput> => {
    if (!ConvertDocumentWithCalibreCommandInputModel) {
      ConvertDocumentWithCalibreCommandInputModel = z.object({
        input: z.object({
          format: z.lazy(() => CalibreInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => CalibreOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithCalibreCommandInput>
    }
    return ConvertDocumentWithCalibreCommandInputModel!
  }
