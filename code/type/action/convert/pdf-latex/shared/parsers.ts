import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  PdfLatexInputFormat,
  PdfLatexOutputFormat,
} from '~/code/type/action/convert/pdf-latex/shared/index'

let PdfLatexInputFormatModel: z.ZodType<PdfLatexInputFormat>

export const PdfLatexInputFormatParser = () => {
  if (!PdfLatexInputFormatModel) {
    PdfLatexInputFormatModel = z.enum(
      LOAD('pdf_latex_input_format') as readonly [string, ...string[]],
    ) as z.ZodType<PdfLatexInputFormat>
  }
  return PdfLatexInputFormatModel!
}

let PdfLatexOutputFormatModel: z.ZodType<PdfLatexOutputFormat>

export const PdfLatexOutputFormatParser = () => {
  if (!PdfLatexOutputFormatModel) {
    PdfLatexOutputFormatModel = z.enum(
      LOAD('pdf_latex_output_format') as readonly [string, ...string[]],
    ) as z.ZodType<PdfLatexOutputFormat>
  }
  return PdfLatexOutputFormatModel!
}
