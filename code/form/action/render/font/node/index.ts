import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type RenderFontNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  text: string
  fontSize?: number
  features?: string
}
export type RenderFontNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  text: string
  fontSize?: number
  features?: string
}
export type RenderFontNodeInput =
  | RenderFontNodeRemoteInput
  | RenderFontNodeLocalExternalInput
  | RenderFontNodeLocalInternalInput
export type RenderFontNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  text: string
  fontSize?: number
  features?: string
}
export type RenderFontNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  text: string
  fontSize?: number
  features?: string
}
export type RenderFontNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file: LocalOutputPath
  }
  text: string
  fontSize?: number
  features?: string
}
export type RenderFontNodeOutput = {
  file: FilePath
}
export type RenderFontNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  text: string
  fontSize?: number
  features?: string
}
