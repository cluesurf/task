import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type CompressVideoBrowserInput =
  | CompressVideoBrowserRemoteInput
  | CompressVideoBrowserLocalInput
export type CompressVideoBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  crf?: string
  preset?: string
}
export type CompressVideoBrowserOutput = {
  file: FileContent
}
export type CompressVideoBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  crf?: string
  preset?: string
}
