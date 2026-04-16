import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type TrimVideoNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  start?: string
  end?: string
  duration?: string
  reencode?: boolean
}
export type TrimVideoNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  start?: string
  end?: string
  duration?: string
  reencode?: boolean
}
export type TrimVideoNodeInput =
  | TrimVideoNodeRemoteInput
  | TrimVideoNodeLocalExternalInput
  | TrimVideoNodeLocalInternalInput
export type TrimVideoNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  start?: string
  end?: string
  duration?: string
  reencode?: boolean
}
export type TrimVideoNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  start?: string
  end?: string
  duration?: string
  reencode?: boolean
}
export type TrimVideoNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file: LocalOutputPath
  }
  start?: string
  end?: string
  duration?: string
  reencode?: boolean
}
export type TrimVideoNodeOutput = {
  file: FilePath
}
export type TrimVideoNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  start?: string
  end?: string
  duration?: string
  reencode?: boolean
}
