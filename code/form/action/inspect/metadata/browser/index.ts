import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type InspectMetadataBrowserInput =
  | InspectMetadataBrowserRemoteInput
  | InspectMetadataBrowserLocalInput
export type InspectMetadataBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
}
export type InspectMetadataBrowserOutput = {
  file: FileContent
}
export type InspectMetadataBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
}
