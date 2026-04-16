import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type RemoveExifBrowserInput =
  | RemoveExifBrowserRemoteInput
  | RemoveExifBrowserLocalInput
export type RemoveExifBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  tag?: Array<string>
  preset?: Array<string>
  overwrite?: boolean
}
export type RemoveExifBrowserOutput = {
  file: FileContent
}
export type RemoveExifBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  tag?: Array<string>
  preset?: Array<string>
  overwrite?: boolean
}
