import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type UpdateImageBrowserInput =
  | UpdateImageBrowserRemoteInput
  | UpdateImageBrowserLocalInput
export type UpdateImageBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  grayscale?: boolean
  brightness?: string
  contrast?: string
  saturation?: string
}
export type UpdateImageBrowserOutput = {
  file: FileContent
}
export type UpdateImageBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  grayscale?: boolean
  brightness?: string
  contrast?: string
  saturation?: string
}
