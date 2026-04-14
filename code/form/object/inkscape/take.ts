import { z } from 'zod'

import {
  InkscapeExportFormat,
  InkscapeImportFormat,
} from '~/code/form/object/inkscape'
import {
  INKSCAPE_EXPORT_FORMAT,
  INKSCAPE_IMPORT_FORMAT,
} from '~/code/form/object/inkscape/base'

export const InkscapeExportFormatParser = z.enum(
  INKSCAPE_EXPORT_FORMAT as readonly [string, ...string[]],
) as z.ZodType<InkscapeExportFormat>

export const InkscapeImportFormatParser = z.enum(
  INKSCAPE_IMPORT_FORMAT as readonly [string, ...string[]],
) as z.ZodType<InkscapeImportFormat>
