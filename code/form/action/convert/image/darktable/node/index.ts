import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type ConvertImageWithDarktableNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  xmp?: string
  highQuality?: boolean
  upscale?: boolean
}
export type ConvertImageWithDarktableNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  xmp?: string
  highQuality?: boolean
  upscale?: boolean
}
export type ConvertImageWithDarktableNodeInput =
  | ConvertImageWithDarktableNodeRemoteInput
  | ConvertImageWithDarktableNodeLocalExternalInput
  | ConvertImageWithDarktableNodeLocalInternalInput
export type ConvertImageWithDarktableNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  xmp?: string
  highQuality?: boolean
  upscale?: boolean
}
export type ConvertImageWithDarktableNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  xmp?: string
  highQuality?: boolean
  upscale?: boolean
}
export type ConvertImageWithDarktableNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file: LocalOutputPath
  }
  xmp?: string
  highQuality?: boolean
  upscale?: boolean
}
export type ConvertImageWithDarktableNodeOutput = {
  file: FilePath
}
export type ConvertImageWithDarktableNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  xmp?: string
  highQuality?: boolean
  upscale?: boolean
}
