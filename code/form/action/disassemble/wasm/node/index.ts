import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type DisassembleWasmNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  folding?: boolean
  inline?: boolean
  noDebugNames?: boolean
}
export type DisassembleWasmNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  folding?: boolean
  inline?: boolean
  noDebugNames?: boolean
}
export type DisassembleWasmNodeInput =
  | DisassembleWasmNodeRemoteInput
  | DisassembleWasmNodeLocalExternalInput
  | DisassembleWasmNodeLocalInternalInput
export type DisassembleWasmNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  folding?: boolean
  inline?: boolean
  noDebugNames?: boolean
}
export type DisassembleWasmNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output?: {
    file?: LocalPath
  }
  folding?: boolean
  inline?: boolean
  noDebugNames?: boolean
}
export type DisassembleWasmNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output?: {
    file?: LocalOutputPath
  }
  folding?: boolean
  inline?: boolean
  noDebugNames?: boolean
}
export type DisassembleWasmNodeOutput = {
  file: FilePath
}
export type DisassembleWasmNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  folding?: boolean
  inline?: boolean
  noDebugNames?: boolean
}
