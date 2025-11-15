import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import { Archive } from '~/code/form/action/archive/index'
import { ArchiveFormatParser } from '~/code/form/object/archive/parsers'

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
