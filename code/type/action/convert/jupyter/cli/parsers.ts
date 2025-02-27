import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import { ConvertDocumentWithJupyterCommandInput } from '~/code/type/action/convert/jupyter/cli/index'
import { LocalPathParser } from '~/code/type/object/file/parsers'

let ConvertDocumentWithJupyterCommandInputModel: z.ZodType<ConvertDocumentWithJupyterCommandInput>

export const ConvertDocumentWithJupyterCommandInputParser =
  (): z.ZodType<ConvertDocumentWithJupyterCommandInput> => {
    if (!ConvertDocumentWithJupyterCommandInputModel) {
      ConvertDocumentWithJupyterCommandInputModel = z.object({
        input: z.object({
          format: z.string(),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.string(),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertDocumentWithJupyterCommandInput>
    }
    return ConvertDocumentWithJupyterCommandInputModel!
  }
