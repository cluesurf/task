import {
  PdfLatexInputFormat,
  PdfLatexOutputFormat,
} from '~/code/type/action/convert/pdf-latex/shared/index'
import { LocalPath } from '~/code/type/object/file/index'

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
