import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import { ConvertDocumentWithCalibreCommandInput } from '~/code/type/action/convert/calibre/cli/index'
import {
  CalibreInputFormatParser,
  CalibreOutputFormatParser,
} from '~/code/type/object/calibre/parsers'
import { LocalPathParser } from '~/code/type/object/file/parsers'

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
