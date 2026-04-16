import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type NormalizeAudioBrowserInput =
  | NormalizeAudioBrowserRemoteInput
  | NormalizeAudioBrowserLocalInput
export type NormalizeAudioBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  target?: string
  peak?: string
  range?: string
}
export type NormalizeAudioBrowserOutput = {
  file: FileContent
}
export type NormalizeAudioBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  target?: string
  peak?: string
  range?: string
}
