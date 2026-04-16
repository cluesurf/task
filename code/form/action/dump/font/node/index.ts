import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type DumpFontNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  tables?: string
}
export type DumpFontNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  tables?: string
}
export type DumpFontNodeInput =
  | DumpFontNodeRemoteInput
  | DumpFontNodeLocalExternalInput
  | DumpFontNodeLocalInternalInput
export type DumpFontNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  tables?: string
}
export type DumpFontNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output: {
    file?: LocalPath
  }
  tables?: string
}
export type DumpFontNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  tables?: string
}
export type DumpFontNodeOutput = {
  file: FilePath
}
export type DumpFontNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  tables?: string
}
