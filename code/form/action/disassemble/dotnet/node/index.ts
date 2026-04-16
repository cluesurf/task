import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type DisassembleDotnetNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  bytes?: boolean
  header?: boolean
  tokens?: boolean
  noBar?: boolean
}
export type DisassembleDotnetNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  bytes?: boolean
  header?: boolean
  tokens?: boolean
  noBar?: boolean
}
export type DisassembleDotnetNodeInput =
  | DisassembleDotnetNodeRemoteInput
  | DisassembleDotnetNodeLocalExternalInput
  | DisassembleDotnetNodeLocalInternalInput
export type DisassembleDotnetNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  bytes?: boolean
  header?: boolean
  tokens?: boolean
  noBar?: boolean
}
export type DisassembleDotnetNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output: {
    file?: LocalPath
  }
  bytes?: boolean
  header?: boolean
  tokens?: boolean
  noBar?: boolean
}
export type DisassembleDotnetNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  bytes?: boolean
  header?: boolean
  tokens?: boolean
  noBar?: boolean
}
export type DisassembleDotnetNodeOutput = {
  file: FilePath
}
export type DisassembleDotnetNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  bytes?: boolean
  header?: boolean
  tokens?: boolean
  noBar?: boolean
}
