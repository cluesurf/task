import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type TrimAudioBrowserInput =
  | TrimAudioBrowserRemoteInput
  | TrimAudioBrowserLocalInput
export type TrimAudioBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  start?: string
  end?: string
  duration?: string
}
export type TrimAudioBrowserOutput = {
  file: FileContent
}
export type TrimAudioBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  start?: string
  end?: string
  duration?: string
}
