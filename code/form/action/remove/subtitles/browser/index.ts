import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type RemoveSubtitlesBrowserInput =
  | RemoveSubtitlesBrowserRemoteInput
  | RemoveSubtitlesBrowserLocalInput
export type RemoveSubtitlesBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
}
export type RemoveSubtitlesBrowserOutput = {
  file: FileContent
}
export type RemoveSubtitlesBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
}
