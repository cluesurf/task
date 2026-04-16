import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type RemoveAudioBrowserInput =
  | RemoveAudioBrowserRemoteInput
  | RemoveAudioBrowserLocalInput
export type RemoveAudioBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
}
export type RemoveAudioBrowserOutput = {
  file: FileContent
}
export type RemoveAudioBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
}
