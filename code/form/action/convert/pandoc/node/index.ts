import {
  PandocInputFormat,
  PandocOutputFormat,
} from '~/code/form/object/pandoc/index'
import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file/index'

export type ConvertDocumentWithPandocNodeClientInput = {
  handle: 'client'
  input: {
    format: PandocInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: PandocOutputFormat
  }
}
export type ConvertDocumentWithPandocNodeExternalInput = {
  handle: 'external'
  input: {
    format: PandocInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: PandocOutputFormat
  }
}
export type ConvertDocumentWithPandocNodeInput =
  | ConvertDocumentWithPandocNodeRemoteInput
  | ConvertDocumentWithPandocNodeLocalExternalInput
  | ConvertDocumentWithPandocNodeLocalInternalInput
export type ConvertDocumentWithPandocNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: PandocInputFormat
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: PandocOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertDocumentWithPandocNodeLocalInput = {
  input: {
    format: PandocInputFormat
    file: LocalPath
  }
  output: {
    format: PandocOutputFormat
    file: LocalPath
  }
  pathScope?: string
}
export type ConvertDocumentWithPandocNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: PandocInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: PandocOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertDocumentWithPandocNodeOutput = {
  file: FilePath
}
export type ConvertDocumentWithPandocNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: PandocInputFormat
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: PandocOutputFormat
    file?: LocalOutputPath
  }
  pathScope?: string
}
