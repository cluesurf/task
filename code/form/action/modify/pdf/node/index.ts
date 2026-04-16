import {
  FileContentWithSha256,
  FileInputPath,
  FilePath,
  LocalOutputPath,
  LocalPath,
  RemoteInputPath,
} from '~/code/form/object/file'

export type ModifyPdfNodeClientInput = {
  handle: 'client'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  order?: string
  remove?: string
}
export type ModifyPdfNodeExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  order?: string
  remove?: string
}
export type ModifyPdfNodeInput =
  | ModifyPdfNodeRemoteInput
  | ModifyPdfNodeLocalExternalInput
  | ModifyPdfNodeLocalInternalInput
export type ModifyPdfNodeLocalExternalInput = {
  handle: 'external'
  input: {
    file: RemoteInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  order?: string
  remove?: string
}
export type ModifyPdfNodeLocalInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  order?: string
  remove?: string
}
export type ModifyPdfNodeLocalInternalInput = {
  handle?: 'internal'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file: LocalOutputPath
  }
  order?: string
  remove?: string
}
export type ModifyPdfNodeOutput = {
  file: FilePath
}
export type ModifyPdfNodeRemoteInput = {
  handle: 'remote'
  input: {
    file: FileInputPath | FileContentWithSha256
  }
  output: {
    file?: LocalOutputPath
  }
  order?: string
  remove?: string
}
