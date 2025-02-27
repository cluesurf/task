import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  ConvertLatexToPngInputFormat,
  ConvertLatexToPngOutputFormat,
} from '~/code/type/action/convert/latex-to-png/shared/index'

let ConvertLatexToPngInputFormatModel: z.ZodType<ConvertLatexToPngInputFormat>

export const ConvertLatexToPngInputFormatParser = () => {
  if (!ConvertLatexToPngInputFormatModel) {
    ConvertLatexToPngInputFormatModel = z.enum(
      LOAD('convert_latex_to_png_input_format') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConvertLatexToPngInputFormat>
  }
  return ConvertLatexToPngInputFormatModel!
}

let ConvertLatexToPngOutputFormatModel: z.ZodType<ConvertLatexToPngOutputFormat>

export const ConvertLatexToPngOutputFormatParser = () => {
  if (!ConvertLatexToPngOutputFormatModel) {
    ConvertLatexToPngOutputFormatModel = z.enum(
      LOAD('convert_latex_to_png_output_format') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<ConvertLatexToPngOutputFormat>
  }
  return ConvertLatexToPngOutputFormatModel!
}
