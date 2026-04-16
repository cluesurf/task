import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type GetDurationBrowserInput =
  | GetDurationBrowserRemoteInput
  | GetDurationBrowserLocalInput
export type GetDurationBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  unit?: 'ms' | 's' | 'clock'
  video?: boolean
}
export type GetDurationBrowserOutput = {
  file: FileContent
}
export type GetDurationBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  unit?: 'ms' | 's' | 'clock'
  video?: boolean
}
