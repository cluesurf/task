import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type SplitAudioBrowserInput =
  | SplitAudioBrowserRemoteInput
  | SplitAudioBrowserLocalInput
export type SplitAudioBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  segments: string
  silenceDb?: string
  silenceDuration?: string
}
export type SplitAudioBrowserOutput = {
  file: FileContent
}
export type SplitAudioBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  segments: string
  silenceDb?: string
  silenceDuration?: string
}
