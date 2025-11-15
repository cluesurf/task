import {
  PdfLatexInputFormat,
  PdfLatexOutputFormat,
} from '~/code/form/action/convert/pdf-latex/shared/index'
import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file/index'

export type ConvertLatexWithPdfLatexBrowserInput =
  | ConvertLatexWithPdfLatexBrowserRemoteInput
  | ConvertLatexWithPdfLatexBrowserLocalInput
export type ConvertLatexWithPdfLatexBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: PdfLatexInputFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: PdfLatexOutputFormat
  }
}
export type ConvertLatexWithPdfLatexBrowserOutput = {
  file: FileContent
}
export type ConvertLatexWithPdfLatexBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: PdfLatexInputFormat
    file: FileContentWithSha256
  }
  output: {
    format: PdfLatexOutputFormat
  }
}
