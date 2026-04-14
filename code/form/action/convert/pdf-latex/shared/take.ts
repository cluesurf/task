import { z } from 'zod'

import {
  PdfLatexInputFormat,
  PdfLatexOutputFormat,
} from '~/code/form/action/convert/pdf-latex/shared'
import {
  PDF_LATEX_INPUT_FORMAT,
  PDF_LATEX_OUTPUT_FORMAT,
} from '~/code/form/action/convert/pdf-latex/shared/base'

export const PdfLatexInputFormatParser = z.enum(
  PDF_LATEX_INPUT_FORMAT as readonly [string, ...string[]],
) as z.ZodType<PdfLatexInputFormat>

export const PdfLatexOutputFormatParser = z.enum(
  PDF_LATEX_OUTPUT_FORMAT as readonly [string, ...string[]],
) as z.ZodType<PdfLatexOutputFormat>
