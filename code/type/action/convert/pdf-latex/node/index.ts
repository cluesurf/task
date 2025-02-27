import {
  PdfLatexInputFormat,
  PdfLatexOutputFormat,
} from '~/code/type/action/convert/pdf-latex/shared/index'
import {
  FileContent,
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/type/object/file/index'

export type ConvertLatexWithPdfLatexNodeClientInput = {
  handle: 'client'
  input: {
    format: PdfLatexInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: PdfLatexOutputFormat
  }
}
export type ConvertLatexWithPdfLatexNodeExternalInput = {
  handle: 'external'
  input: {
    format: PdfLatexInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: PdfLatexOutputFormat
  }
}
export type ConvertLatexWithPdfLatexNodeInput =
  | ConvertLatexWithPdfLatexNodeRemoteInput
  | ConvertLatexWithPdfLatexNodeLocalExternalInput
  | ConvertLatexWithPdfLatexNodeLocalInternalInput
export type ConvertLatexWithPdfLatexNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: PdfLatexInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: PdfLatexOutputFormat
  }
  pathScope?: string
}
export type ConvertLatexWithPdfLatexNodeLocalInput = {
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
export type ConvertLatexWithPdfLatexNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: PdfLatexInputFormat
    file: FileInputPath | FileContent
  }
  output: {
    format: PdfLatexOutputFormat
    directory?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertLatexWithPdfLatexNodeOutput = {
  file: FilePath
}
export type ConvertLatexWithPdfLatexNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: PdfLatexInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: PdfLatexOutputFormat
    directory?: LocalOutputPath
  }
  pathScope?: string
}
