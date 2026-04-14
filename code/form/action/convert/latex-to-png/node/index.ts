import {
  ConvertLatexToPngInputFormat,
  ConvertLatexToPngOutputFormat,
} from '~/code/form/action/convert/latex-to-png/shared'
import {
  FileContent,
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type ConvertLatexToPngNodeClientInput = {
  handle: 'client'
  input: {
    format: ConvertLatexToPngInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: ConvertLatexToPngOutputFormat
  }
}
export type ConvertLatexToPngNodeExternalInput = {
  handle: 'external'
  input: {
    format: ConvertLatexToPngInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: ConvertLatexToPngOutputFormat
  }
}
export type ConvertLatexToPngNodeInput =
  | ConvertLatexToPngNodeRemoteInput
  | ConvertLatexToPngNodeLocalExternalInput
  | ConvertLatexToPngNodeLocalInternalInput
export type ConvertLatexToPngNodeLocalExternalInput = {
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
export type ConvertLatexToPngNodeLocalInput = {
  input: {
    format: string
    file: LocalPath
  }
  output: {
    format: string
    file?: LocalPath
  }
  pathScope?: string
}
export type ConvertLatexToPngNodeLocalInternalInput = {
  handle?: 'internal'
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
export type ConvertLatexToPngNodeOutput = {
  file: FilePath
}
export type ConvertLatexToPngNodeRemoteInput = {
  handle: 'remote'
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
