import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import { Archive } from '~/code/type/action/archive/index'
import { ArchiveFormatParser } from '~/code/type/object/archive/parsers'

let ArchiveModel: z.ZodType<Archive>

export const ArchiveParser = (): z.ZodType<Archive> => {
  if (!ArchiveModel) {
    ArchiveModel = z.object({
      input: z.object({
        path: z.string(),
      }),
      output: z.object({
        format: z.lazy(() => ArchiveFormatParser()),
        file: z.object({
          path: z.string(),
        }),
      }),
    }) as z.ZodType<Archive>
  }
  return ArchiveModel!
}
