import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type InspectFileBrowserInput =
  | InspectFileBrowserRemoteInput
  | InspectFileBrowserLocalInput
export type InspectFileBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
}
export type InspectFileBrowserOutput = {
  file: FileContent
}
export type InspectFileBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
}
