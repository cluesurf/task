import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type RotateVideoBrowserInput =
  | RotateVideoBrowserRemoteInput
  | RotateVideoBrowserLocalInput
export type RotateVideoBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  degree: string
}
export type RotateVideoBrowserOutput = {
  file: FileContent
}
export type RotateVideoBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  degree: string
}
