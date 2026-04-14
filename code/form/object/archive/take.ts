import { z } from 'zod'

import { ArchiveFormat } from '~/code/form/object/archive'
import { ARCHIVE_FORMAT } from '~/code/form/object/archive/base'

export const ArchiveFormatParser = z.enum(
  ARCHIVE_FORMAT as readonly [string, ...string[]],
) as z.ZodType<ArchiveFormat>
