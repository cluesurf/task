import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import { ConvertArchiveCommandInput } from '~/code/type/action/convert/archive/cli/index'
import { ArchiveFormatParser } from '~/code/type/object/archive/parsers'
import { LocalPathParser } from '~/code/type/object/file/parsers'

let ConvertArchiveCommandInputModel: z.ZodType<ConvertArchiveCommandInput>

export const ConvertArchiveCommandInputParser =
  (): z.ZodType<ConvertArchiveCommandInput> => {
    if (!ConvertArchiveCommandInputModel) {
      ConvertArchiveCommandInputModel = z.object({
        input: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => ArchiveFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<ConvertArchiveCommandInput>
    }
    return ConvertArchiveCommandInputModel!
  }
