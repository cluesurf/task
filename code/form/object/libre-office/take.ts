import { z } from 'zod'

import {
  LibreOfficeInputFormat,
  LibreOfficeOutputFormat,
} from '~/code/form/object/libre-office'
import {
  LIBRE_OFFICE_INPUT_FORMAT,
  LIBRE_OFFICE_OUTPUT_FORMAT,
} from '~/code/form/object/libre-office/base'

export const LibreOfficeInputFormatParser = z.enum(
  LIBRE_OFFICE_INPUT_FORMAT as readonly [string, ...string[]],
) as z.ZodType<LibreOfficeInputFormat>

export const LibreOfficeOutputFormatParser = z.enum(
  LIBRE_OFFICE_OUTPUT_FORMAT as readonly [string, ...string[]],
) as z.ZodType<LibreOfficeOutputFormat>
