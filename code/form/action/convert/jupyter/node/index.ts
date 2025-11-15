import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file/index'

export type ConvertDocumentWithJupyterNodeClientInput = {
  handle: 'client'
  input: {
    format: string
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: string
  }
}
export type ConvertDocumentWithJupyterNodeExternalInput = {
  handle: 'external'
  input: {
    format: string
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: string
  }
}
export type ConvertDocumentWithJupyterNodeInput =
  | ConvertDocumentWithJupyterNodeRemoteInput
  | ConvertDocumentWithJupyterNodeLocalExternalInput
  | ConvertDocumentWithJupyterNodeLocalInternalInput
export type ConvertDocumentWithJupyterNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: string
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    format: string
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertDocumentWithJupyterNodeLocalInput = {
  input: {
    format: string
    file: LocalPath
  }
  output: {
    format: string
    file: LocalPath
  }
  pathScope?: string
}
export type ConvertDocumentWithJupyterNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: string
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: string
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type ConvertDocumentWithJupyterNodeOutput = {
  file: FilePath
}
export type ConvertDocumentWithJupyterNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: string
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    format: string
    file?: LocalOutputPath
  }
  pathScope?: string
}
