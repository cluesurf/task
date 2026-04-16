import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type CompressAudioBrowserInput =
  | CompressAudioBrowserRemoteInput
  | CompressAudioBrowserLocalInput
export type CompressAudioBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  bitrate?: string
}
export type CompressAudioBrowserOutput = {
  file: FileContent
}
export type CompressAudioBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  bitrate?: string
}
