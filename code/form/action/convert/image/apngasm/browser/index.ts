import {
  FileContent,
  FileContentWithSha256,
} from '~/code/form/object/file'

export type ConvertImageWithApngasmBrowserInput =
  | ConvertImageWithApngasmBrowserRemoteInput
  | ConvertImageWithApngasmBrowserLocalInput
export type ConvertImageWithApngasmBrowserLocalInput = {
  handle?: 'local'
  input: {
    file: {
      content: FileContent
    }
  }
  delay?: number
  skipDuplicates?: boolean
}
export type ConvertImageWithApngasmBrowserOutput = {
  file: FileContent
}
export type ConvertImageWithApngasmBrowserRemoteInput = {
  handle: 'remote'
  input: {
    file: FileContentWithSha256
  }
  delay?: number
  skipDuplicates?: boolean
}
