import { z } from 'zod'

import { ArchiveFormat, ArchiveTool } from '~/code/form/object/archive'
import {
  ARCHIVE_FORMAT,
  ARCHIVE_TOOL,
} from '~/code/form/object/archive/base'

export const ArchiveFormatParser = z.enum(
  ARCHIVE_FORMAT as readonly [string, ...string[]],
) as z.ZodType<ArchiveFormat>

export const ArchiveToolParser = z.enum(
  ARCHIVE_TOOL as readonly [string, ...string[]],
) as z.ZodType<ArchiveTool>
