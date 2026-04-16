import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type UpdateVideoBrowserInput =
  | UpdateVideoBrowserRemoteInput
  | UpdateVideoBrowserLocalInput
export type UpdateVideoBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  subtitles?: string
}
export type UpdateVideoBrowserOutput = {
  file: FileContent
}
export type UpdateVideoBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  subtitles?: string
}
