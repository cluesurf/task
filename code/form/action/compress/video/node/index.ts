import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type CompressVideoNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  crf?: string
  preset?: string
}
export type CompressVideoNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  crf?: string
  preset?: string
}
export type CompressVideoNodeInput =
  | CompressVideoNodeRemoteInput
  | CompressVideoNodeLocalExternalInput
  | CompressVideoNodeLocalInternalInput
export type CompressVideoNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  crf?: string
  preset?: string
}
export type CompressVideoNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  crf?: string
  preset?: string
}
export type CompressVideoNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file: LocalOutputPath
  }
  crf?: string
  preset?: string
}
export type CompressVideoNodeOutput = {
  file: FilePath
}
export type CompressVideoNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  crf?: string
  preset?: string
}
