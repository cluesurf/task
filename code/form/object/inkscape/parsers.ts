import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  InkscapeExportFormat,
  InkscapeImportFormat,
} from '~/code/form/object/inkscape/index'

let InkscapeExportFormatModel: z.ZodType<InkscapeExportFormat>

export const InkscapeExportFormatParser = () => {
  if (!InkscapeExportFormatModel) {
    InkscapeExportFormatModel = z.enum(
      LOAD('inkscape_export_format') as readonly [string, ...string[]],
    ) as z.ZodType<InkscapeExportFormat>
  }
  return InkscapeExportFormatModel!
}

let InkscapeImportFormatModel: z.ZodType<InkscapeImportFormat>

export const InkscapeImportFormatParser = () => {
  if (!InkscapeImportFormatModel) {
    InkscapeImportFormatModel = z.enum(
      LOAD('inkscape_import_format') as readonly [string, ...string[]],
    ) as z.ZodType<InkscapeImportFormat>
  }
  return InkscapeImportFormatModel!
}
