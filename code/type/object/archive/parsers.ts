import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import { ArchiveFormat } from '~/code/type/object/archive/index'

let ArchiveFormatModel: z.ZodType<ArchiveFormat>

export const ArchiveFormatParser = () => {
  if (!ArchiveFormatModel) {
    ArchiveFormatModel = z.enum(
      LOAD('archive_format') as readonly [string, ...string[]],
    ) as z.ZodType<ArchiveFormat>
  }
  return ArchiveFormatModel!
}
