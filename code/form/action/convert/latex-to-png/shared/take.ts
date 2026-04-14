import { z } from 'zod'

import {
  ConvertLatexToPngInputFormat,
  ConvertLatexToPngOutputFormat,
} from '~/code/form/action/convert/latex-to-png/shared'
import {
  CONVERT_LATEX_TO_PNG_INPUT_FORMAT,
  CONVERT_LATEX_TO_PNG_OUTPUT_FORMAT,
} from '~/code/form/action/convert/latex-to-png/shared/base'

export const ConvertLatexToPngInputFormatParser = z.enum(
  CONVERT_LATEX_TO_PNG_INPUT_FORMAT as readonly [string, ...string[]],
) as z.ZodType<ConvertLatexToPngInputFormat>

export const ConvertLatexToPngOutputFormatParser = z.enum(
  CONVERT_LATEX_TO_PNG_OUTPUT_FORMAT as readonly [string, ...string[]],
) as z.ZodType<ConvertLatexToPngOutputFormat>
