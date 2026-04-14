import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type SanitizeHtmlCommandInput = {
  input: {
    format: string
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  pathScope?: string
}
export type SanitizeHtmlNodeClientInput = {
  handle: 'client'
  input: {
    format: string
    file: FileInputPath | FileContentWithSha256
  }
}
export type SanitizeHtmlNodeExternalInput = {
  handle: 'external'
  input: {
    format: string
    file: RemoteInputPath | FileContentWithSha256
  }
}
export type SanitizeHtmlNodeInput =
  | SanitizeHtmlNodeRemoteInput
  | SanitizeHtmlNodeLocalExternalInput
  | SanitizeHtmlNodeLocalInternalInput
export type SanitizeHtmlNodeLocalExternalInput = {
  handle: 'external'
  input: {
    format: string
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type SanitizeHtmlNodeLocalInput = {
  input: {
    format: string
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  pathScope?: string
}
export type SanitizeHtmlNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    format: string
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
export type SanitizeHtmlNodeOutput = {
  file: FilePath
}
export type SanitizeHtmlNodeRemoteInput = {
  handle: 'remote'
  input: {
    format: string
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  pathScope?: string
}
