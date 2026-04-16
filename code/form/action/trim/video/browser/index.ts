import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type TrimVideoBrowserInput =
  | TrimVideoBrowserRemoteInput
  | TrimVideoBrowserLocalInput
export type TrimVideoBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  start?: string
  end?: string
  duration?: string
  reencode?: boolean
}
export type TrimVideoBrowserOutput = {
  file: FileContent
}
export type TrimVideoBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  start?: string
  end?: string
  duration?: string
  reencode?: boolean
}
