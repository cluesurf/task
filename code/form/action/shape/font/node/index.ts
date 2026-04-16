import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type ShapeFontNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  text: string
  features?: string
  script?: string
  language?: string
  direction?: string
}
export type ShapeFontNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  text: string
  features?: string
  script?: string
  language?: string
  direction?: string
}
export type ShapeFontNodeInput =
  | ShapeFontNodeRemoteInput
  | ShapeFontNodeLocalExternalInput
  | ShapeFontNodeLocalInternalInput
export type ShapeFontNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  text: string
  features?: string
  script?: string
  language?: string
  direction?: string
}
export type ShapeFontNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output?: {
    file?: LocalPath
  }
  text: string
  features?: string
  script?: string
  language?: string
  direction?: string
}
export type ShapeFontNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output?: {
    file?: LocalOutputPath
  }
  text: string
  features?: string
  script?: string
  language?: string
  direction?: string
}
export type ShapeFontNodeOutput = {
  file: FilePath
}
export type ShapeFontNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  text: string
  features?: string
  script?: string
  language?: string
  direction?: string
}
