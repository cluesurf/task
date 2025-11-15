import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  LibreOfficeInputFormat,
  LibreOfficeOutputFormat,
} from '~/code/form/object/libre-office/index'

let LibreOfficeInputFormatModel: z.ZodType<LibreOfficeInputFormat>

export const LibreOfficeInputFormatParser = () => {
  if (!LibreOfficeInputFormatModel) {
    LibreOfficeInputFormatModel = z.enum(
      LOAD('libre_office_input_format') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<LibreOfficeInputFormat>
  }
  return LibreOfficeInputFormatModel!
}

let LibreOfficeOutputFormatModel: z.ZodType<LibreOfficeOutputFormat>

export const LibreOfficeOutputFormatParser = () => {
  if (!LibreOfficeOutputFormatModel) {
    LibreOfficeOutputFormatModel = z.enum(
      LOAD('libre_office_output_format') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<LibreOfficeOutputFormat>
  }
  return LibreOfficeOutputFormatModel!
}
