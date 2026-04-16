import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type ConvertImageWithApngasmNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  delay?: number
  skipDuplicates?: boolean
}
export type ConvertImageWithApngasmNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  delay?: number
  skipDuplicates?: boolean
}
export type ConvertImageWithApngasmNodeInput =
  | ConvertImageWithApngasmNodeRemoteInput
  | ConvertImageWithApngasmNodeLocalExternalInput
  | ConvertImageWithApngasmNodeLocalInternalInput
export type ConvertImageWithApngasmNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  delay?: number
  skipDuplicates?: boolean
}
export type ConvertImageWithApngasmNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  delay?: number
  skipDuplicates?: boolean
}
export type ConvertImageWithApngasmNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file: LocalOutputPath
  }
  delay?: number
  skipDuplicates?: boolean
}
export type ConvertImageWithApngasmNodeOutput = {
  file: FilePath
}
export type ConvertImageWithApngasmNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  delay?: number
  skipDuplicates?: boolean
}
