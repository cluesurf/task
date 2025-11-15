import {
  PdfLatexInputFormat,
  PdfLatexOutputFormat,
} from '~/code/form/action/convert/pdf-latex/shared/index'
import { LocalPath } from '~/code/form/object/file/index'

export type ConvertLatexWithPdfLatexCommandInput = {
  input: {
    format: PdfLatexInputFormat
    file: LocalPath
  }
  output: {
    format: PdfLatexOutputFormat
    directory: LocalPath
  }
  pathScope?: string
}
