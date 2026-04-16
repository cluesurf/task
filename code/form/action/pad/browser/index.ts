import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type PadBrowserInput =
  | PadBrowserRemoteInput
  | PadBrowserLocalInput
export type PadBrowserLocalInput = {
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
export type PadBrowserOutput = {
  file: FileContent
}
export type PadBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  to: string
  sampleRate?: number
  channels?: number
}
