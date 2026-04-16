import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type SubsetFontNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  text?: string
  unicodes?: string
  layoutFeatures?: string
  flavor?: string
}
export type SubsetFontNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  text?: string
  unicodes?: string
  layoutFeatures?: string
  flavor?: string
}
export type SubsetFontNodeInput =
  | SubsetFontNodeRemoteInput
  | SubsetFontNodeLocalExternalInput
  | SubsetFontNodeLocalInternalInput
export type SubsetFontNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  text?: string
  unicodes?: string
  layoutFeatures?: string
  flavor?: string
}
export type SubsetFontNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  text?: string
  unicodes?: string
  layoutFeatures?: string
  flavor?: string
}
export type SubsetFontNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file: LocalOutputPath
  }
  text?: string
  unicodes?: string
  layoutFeatures?: string
  flavor?: string
}
export type SubsetFontNodeOutput = {
  file: FilePath
}
export type SubsetFontNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  text?: string
  unicodes?: string
  layoutFeatures?: string
  flavor?: string
}
