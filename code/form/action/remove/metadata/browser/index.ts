import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type RemoveMetadataBrowserInput =
  | RemoveMetadataBrowserRemoteInput
  | RemoveMetadataBrowserLocalInput
export type RemoveMetadataBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
}
export type RemoveMetadataBrowserOutput = {
  file: FileContent
}
export type RemoveMetadataBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
}
