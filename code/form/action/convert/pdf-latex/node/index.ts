import {
  PdfLatexInputFormat,
  PdfLatexOutputFormat,
} from '~/code/form/action/convert/pdf-latex/shared'
import {
  FileContent,
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

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
    format: string
    file: FilePath | FileContent
  }
  output: {
    format: string
    file?: LocalPath
  }
  pathScope?: string
}
export type ConvertLatexWithPdfLatexNodeLocalInput = {
  input: {
    format: string
    file: LocalPath
  }
  output: {
    format: string
    directory: LocalPath
    file?: LocalPath
  }
  pathScope?: string
}
export type ConvertLatexWithPdfLatexNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: string
    file: FilePath | FileContent
  }
  output: {
    format: string
    directory?: LocalOutputPath
    file?: LocalPath
  }
  pathScope?: string
}
export type ConvertLatexWithPdfLatexNodeOutput = {
  file: FilePath
}
export type ConvertLatexWithPdfLatexNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: string
    file: FilePath | FileContent
  }
  output: {
    format: string
    directory?: LocalOutputPath
    file?: LocalPath
  }
  pathScope?: string
}
