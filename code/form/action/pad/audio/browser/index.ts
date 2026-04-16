import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type PadAudioBrowserInput =
  | PadAudioBrowserRemoteInput
  | PadAudioBrowserLocalInput
export type PadAudioBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  to: string
  sampleRate?: number
  channels?: number
}
export type PadAudioBrowserOutput = {
  file: FileContent
}
export type PadAudioBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  to: string
  sampleRate?: number
  channels?: number
}
