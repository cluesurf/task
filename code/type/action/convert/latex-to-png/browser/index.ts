import {
  ConvertLatexToPngInputFormat,
  ConvertLatexToPngOutputFormat,
} from '~/code/type/action/convert/latex-to-png/shared/index'
import {
  FileContent,
  FileContentWithSha256,
} from '~/code/type/object/file/index'

export type ConvertLatexToPngBrowserInput =
  | ConvertLatexToPngBrowserRemoteInput
  | ConvertLatexToPngBrowserLocalInput
export type ConvertLatexToPngBrowserLocalInput = {
  handle?: 'local'
  input: {
    format: ConvertLatexToPngInputFormat
    file: {
      content: FileContent
    }
  }
  output: {
    format: ConvertLatexToPngOutputFormat
  }
}
export type ConvertLatexToPngBrowserOutput = {
  file: FileContent
}
export type ConvertLatexToPngBrowserRemoteInput = {
  handle: 'remote'
  input: {
    format: ConvertLatexToPngInputFormat
    file: FileContentWithSha256
  }
  output: {
    format: ConvertLatexToPngOutputFormat
  }
}
